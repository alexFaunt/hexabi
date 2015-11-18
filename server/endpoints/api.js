import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';
import api from '../../api';

export default function ({ auth, body }, res, next) {
    if (!auth) {
        return res.status(401).send(JSON.stringify({result: 'failure'}));
    }
    
    api(
        body,
        ({ data }) => res.status(200).send(JSON.stringify(data, null, 2)),
        ({ message }) => res.status(500).send(message)
    );
}
