import config from '../config/server-config';
import cookieParser from 'cookie-parser';
import jwtToken from 'jsonwebtoken';

const parser = cookieParser();

const decode = function (token) {
    if (!token) {
        return token;
    }
    try {
        const decode = jwtToken.verify(token, config.auth.secret);

        return {
            member: decode,
            token
        };
    }
    catch (e) {
        // TODO - this will happen on time out we want a different message for that.
        return null;
    }
};

export default () => (req, res, next) => {
    parser(req, res, function () {
        const token = req.cookies.token || req.headers.token;

        req.auth = decode(token);

        next();
    });
};
