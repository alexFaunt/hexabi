import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';

export default function ({ body }, res) {
    const { username, password } = body;

    // TODO check if it's a good login
    if (username !== "alex" || password !== "pass") {
        console.log('NO AUTHED', username, password);
        return res.status(401).send(JSON.stringify({result: 'failure'}));
    }

    // make a token
    const token = jwtToken.sign({ username, password }, config.auth.secret, {
        expiresIn: config.auth.expires // TODO - KEEP ALIVE
    });

    // TODO - LOGIN TABLE + SESSION TABLE
    const id = '1';

    api('query { member (id: "' + id + '") { id, name } }',
        function ({ data }) {
            // Check against DB
            res.status(200).cookie('token', token).send(JSON.stringify({
                member: data.member,
                token
            }, null, 2));
        },
        ({ message }) => res.status(500).send(message)
    );
}
