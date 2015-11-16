import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';

export default function ({ token }, res) {
    // TODO - validate token
    // const decoded = jwtToken.verify(token, config.auth.secret);
    if (!token) {
        res.status(200).send(JSON.stringify({
            token: null,
            member: null,
            isLoggedIn: false
        }))
        return;
    }

    // TODO - pick member from decoded token
    const id = '1';

    // Get a graphql
    api('query { member (id: "' + id + '") { id, name } }',
        function ({ data }) {
            // Check against DB
            res.status(200)
                .send(JSON.stringify({
                    isLoggedIn: true,
                    member: data.member,
                    token
                }, null, 2));
        },
        ({ message }) => res.status(500).send(err.message)
    );
}
