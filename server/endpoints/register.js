import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';
import bcrypt from 'bcrypt';

export default function ({ body }, res) {
    const { username, password, member } = body;
console.log('endpoint:',username, password, member);
    // TODO - CAN I MAKE THIS LIKE JSON.toString() ?
    // FOR SURE I CAN PASS SOMETHING TO API AND DECONSTRUCT IT.
    // DO that
    // LIKE NOW

    console.log('HELL', `mutation { register (secret: "${config.auth.secret}", username: "${username}",
            password:"${password}", member: "${member}") { id } }`);
    api(`mutation { register (secret: "${config.auth.secret}", username: "${username}",
            password:"${password}", member: ${member}) { id } }`,
        function ({ errors, data }) {

            if (errors) {
                // Fuck knows what happened.
                return res.status(500).clearCookie('token').send(errors);
            }
console.log('REGISTER SUCCESS', data);
            // make a token
            const token = jwtToken.sign({ username, password }, config.auth.secret, {
                expiresIn: config.auth.expires
            });

            // Check against DB
            res.status(200).cookie('token', token).send(JSON.stringify({
                member: 'TODO',
                token
            }, null, 2));
        },
        ({ message }) => res.status(500).clearCookie('token').send(message)
    );
}
