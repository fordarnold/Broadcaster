import Authenticate from '../helpers/auth';
import User from '../models/User';

export default (req, res, next) => {

    try {

        if (!req.headers.authorization) {

            return res.status(401).send({
                status: 401,
                error: 'Please provide a token first',
            });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = Authenticate.verifyToken(token);
        
        req.userData = decoded;

        if (!User.userExists(req.userData.email)) {

            return res.status(401).send({
                status: 401,
                error: 'Sign up first please',
            });
        }

        return next();

    } catch (error) {

        return res.status(401).json({
            status: 401,
            error: 'Authentication failed',
        });
    }
    
};