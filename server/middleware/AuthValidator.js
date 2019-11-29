import joi from '@hapi/joi';

import User from '../models/User';

class AuthValidator {

    static validateSignUp(req, res, next) {

        const Schema = joi.object().keys({
            id: joi.number().integer().required(),
            createdOn: joi.date().required(),
            firstname: joi.string().min(3).max(40).label('First Name').trim().required(),
            lastname: joi.string().min(3).max(40).label('Last Name').trim().required(),
            email: joi.string().email().label('Email').trim().required(),
            phoneNumber: joi.string().min(3).max(40).label('Phone Number').trim().required(),
            username: joi.string().min(3).max(40).label('Username').trim().required(),
            isAdmin: joi.boolean().required(),
            password: joi.string().label('Password').trim().required(),
        });

        const user = new User(req.body);
        const result = Schema.validate(user, {
            abortEarly: false
        });
        const valid = result.error == null;

        if (valid) {
            return next();
        }
        const { details } = result.error;
        const message = details.map(i => i.message.replace(/"/g, '')).join(', ');

        return res.status(400).json({
            status: 400,
            error: message,
        });
    }

    static validateSignIn(req, res, next) {

        const Schema = joi.object().keys({
            email: joi.string().email().label('Email').trim().required(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).label('Password').trim().required(),
        });

        const userChecker = {
            email: req.body.email,
            password: req.body.password,
        };
        
        const result = Schema.validate(userChecker, {
            abortEarly: false
        });

        const valid = result.error == null;

        if (valid) {
            return next();
        }

        const { details } = result.error;
        const message = details.map(i => i.message.replace(/"/g, '')).join(',');

        return res.status(400).json({
            status: 400,
            error: message,
        });
    }
}

export default AuthValidator;