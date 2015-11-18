import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';

export default function ({ body }, res) {
    const { username, password } = body;

    api('query { login (username: "' + username + '", secret: "' + password + '") { member { name } } }',
        function ({ errors, data }) {

            if (errors) {
                return res.status(500).clearCookie('token').send(errors);
            }

            if (!data.login) {
                return res.status(401).clearCookie('token').send({});
            }

            // make a token
            const token = jwtToken.sign({ username, password }, config.auth.secret, {
                expiresIn: config.auth.expires
            });

            // Check against DB
            res.status(200).cookie('token', token).send(JSON.stringify({
                member: data.login.member,
                token
            }, null, 2));
        },
        ({ message }) => res.status(500).clearCookie('token').send(message)
    );
}
