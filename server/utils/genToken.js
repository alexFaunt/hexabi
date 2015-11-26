import jwtToken from 'jsonwebtoken';
import config from '../config/server-config';

export default function (username, id) {
    return jwtToken.sign({ username, id }, config.auth.secret, {
        expiresIn: config.auth.expires
    });
}
