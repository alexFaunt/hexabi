import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';

export default function ({ token, body }, res, next) {
    if (token === null) {
        return res.status(401).send(JSON.stringify({result: 'failure'}));
    }
    // TODO - TEST UNVERIFIED TOKEN + 401 if bad
    const decoded = jwtToken.verify(token, config.auth.secret);
    // TODO - check it?

    // I think if it's expired it throws an error might have to catch

    // TODO - validate decoded token

    // Fetch from the api!
    api(
        body,
        ({ data }) => res.status(200).send(JSON.stringify(data, null, 2)),
        ({ message }) => res.status(500).send(message)
    );
}
