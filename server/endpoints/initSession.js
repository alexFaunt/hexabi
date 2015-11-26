import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';

export default function ({ auth }, res) {
    if (!auth) {
        res.status(200).send(JSON.stringify({
            token: null,
            member: null,
            isLoggedIn: false
        }))
        return;
    }

    // TODO - pick member from decoded token
    const username = auth.member.username;

    // Get a graphql
    api(`query { login (username: "${ username }", secret: "${ config.auth.secret }") { member { id, name } } }`,
        function ({ errors, data }) {
            if (errors) {
                return res.status(500)
                    .send(errors);
            }

            // Check against DB
            res.status(200)
                .send(JSON.stringify({
                    isLoggedIn: true,
                    member: data.member,
                    token: auth.token
                }, null, 2));
        },
        ({ message }) => res.status(500).send(err.message)
    );
}
