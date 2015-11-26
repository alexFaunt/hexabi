import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';
import bcrypt from 'bcrypt';
import genToken from '../utils/genToken';

export default function ({ body }, res) {
    const { username, password, member } = body;

    // TODO - CAN I MAKE THIS LIKE JSON.toString() ?
    // FOR SURE I CAN PASS SOMETHING TO API AND DECONSTRUCT IT.
    // DO that
    // LIKE NOW

    api(`mutation { register (secret: "${config.auth.secret}", username: "${username}",
            password:"${password}", member: ${member}) { id, member { name, id } } }`,
        function ({ errors, data }) {

            if (errors) {
                // Fuck knows what happened.
                return res.status(500).clearCookie('token').send(errors);
            }

            // make a token
            const token = genToken(username, data.register.id);

            // Check against DB
            res.status(200).cookie('token', token).send(JSON.stringify({
                member: data.register.member,
                token
            }, null, 2));
        },
        ({ message }) => res.status(500).clearCookie('token').send(message)
    );
}
