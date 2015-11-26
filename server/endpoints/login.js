import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';
import bcrypt from 'bcrypt';
import genToken from '../utils/genToken';

export default function ({ body }, res) {
    const { username, password } = body;

    api(`query { login (username: "${username}", secret: "${config.auth.secret}") { secret, id, member { id, name } } }`,
        function ({ errors, data }) {


            if (errors) {
                // Fuck knows what happened.
                return res.status(500).clearCookie('token').send(errors);
            }

            if (!data || !data.login) {
                // WRONG USER NAME
                return res.status(401).clearCookie('token').send({});
            }

            bcrypt.compare(password, data.login.secret, function (err, answer) {
                if (err || !answer) {
                    // Wrong password
                    return res.status(401).clearCookie('token').send(err);
                }

                const token = genToken(username, data.login.id);

                // Check against DB
                return res.status(200).cookie('token', token).send(JSON.stringify({
                    member: data.login.member,
                    token
                }, null, 2));
            });
        },
        ({ message }) => res.status(500).clearCookie('token').send(message)
    );
}
