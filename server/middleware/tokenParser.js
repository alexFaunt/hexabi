import cookieParser from 'cookie-parser';

const parser = cookieParser();

export default () => (req, res, next) => {
    parser(req, res, function () {
        req.token = null;

        if (req.cookies.token) {
            req.token = req.cookies.token;
        }
        if (req.headers.token) {
            req.token = req.headers.token;
        }

        // TODO - verify token here.

        next();
    });
};
