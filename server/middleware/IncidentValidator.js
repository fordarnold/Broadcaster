import joi from '@hapi/joi';

import Incident from '../models/Incident';

class IncidentValidator {

    static validateIncident(req, res, next) {

        const Schema = joi.object().keys({

            id: joi.number().integer().required(),
            createdBy: joi.number().integer().required(),
            title: joi.string().min(3).max(100).label('Title').required(),
            type: joi.string().min(3).max(20).label('Type').trim().required(),
            location: joi.string().min(3).max(40).label('Location').trim().required(),
            status: joi.string().min(3).max(20).label('Status').trim().required(),
            images: joi.array().label('Images').required(),
            videos: joi.array().label('Videos').required(),
            comment: joi.string().min(10).max(1000).label('Comment').trim().required(),
            createdOn: joi.date().required()
        });

        if (req.files.images && req.files.videos) {

            const userId = parseInt(req.userData.id, 10);
            const type = req.params.type.split('s')[0];
            const images = req.files.images.map(img => img.path.replace(/\\/g, '/'));
            const videos = req.files.videos.map(vid => vid.path.replace(/\\/g, '/'));

            const incident = new Incident(req.body, type, userId, images, videos);

            const result = Schema.validate(incident, {
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

        return res.status(400).json({
            status: 400,
            error: 'Image(s) or Video(s) is required',
        });
    }

    static validateEditLocation(req, res, next) {

        const Schema = joi.object().keys({
            location: joi.string().min(3).max(40).label('Location').trim().required(),
        });

        const result = Schema.validate(req.body, {
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

    static validateEditComment(req, res, next) {

        const Schema = joi.object().keys({
            comment: joi.string().min(10).max(1000).label('Comment').trim().required(),
        });

        const result = Schema.validate(req.body, {
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

}

export default IncidentValidator;