import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';
import bcrypt from 'bcrypt';

export default function ({ body }, res) {
    const { username, password } = body;

    api(`query { login (username: "${username}", secret: "${config.auth.secret}") { secret, member { name } } }`,
        function ({ errors, data }) {

            if (errors) {
                // Fuck knows what happened.
                return res.status(500).clearCookie('token').send(errors);
            }
            
            if (!data || !data.login) {
                // WRONG USER NAME
                return res.status(401).clearCookie('token').send({});
            }

            bcrypt.compare(password, data.login.secret, function (err, res) {
                if (err) {
                    // Wrong password
                    return res.status(401).clearCookie('token').send(error);
                }

                // make a token
                const token = jwtToken.sign({ username, password }, config.auth.secret, {
                    expiresIn: config.auth.expires
                });

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
