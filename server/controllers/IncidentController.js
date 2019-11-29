import Incident from '../models/Incident';

class IncidentController {
    
    static createIncident(req, res) {

        const userId = parseInt(req.userData.id, 10);
        const type = req.params.type.split('s')[0];
        const images = req.files.images.map(img => img.path.replace(/\\/g, '/'));
        const videos = req.files.videos.map(vid => vid.path.replace(/\\/g, '/'));

        const incident = new Incident(req.body, type, userId, images, videos);

        Incident.createIncident(incident);

        res.status(201).json({
            status: 201,
            data: {
                id: incident.id,
                message: `New ${incident.type} record was created successfully`
            }
        });
    }

    static allIncidents(req, res) {
        
        const userId = req.userData.id;
        const type = req.params.type.split('s')[0];

        const data = Incident.sameTypeIncident(userId, type);

        if (data.length > 0) {
            return res.status(200).json({
                status: 200,
                data
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entries found`
        });
    }

    static singleIncident(req, res) {

        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Incident.incidentExists(id, type);

        if (data) {
            return res.status(200).json({
                status: 200,
                data
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} incident with id: ${id} found`
        });
    }

    static deleteIncident(req, res) {

        const type = req.params.type.split('s')[0];
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Incident.incidentOwner(id, type, req.userData.id);

        if (data) {
            Incident.destroyIncident(data);
            return res.status(200).json({
                status: 200,
                message: `${type} record has been deleted`
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} incident with id: ${id} found`
        });
    }

    static editLocation(req, res) {

        const type = req.params.type.split('s')[0];
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Incident.incidentOwner(id, type, req.userData.id);

        if (data) {
            if (data.status === 'draft') {
                data.location = req.body.location;
                return res.status(200).json({
                    status: 200,
                    data: {
                        id: data.id,
                        message: `Updated ${type} record's location`
                    }
                });
            }
            return res.status(403).json({
                status: 403,
                error: `You are not allowed to change this location`
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} incident with id: ${id} found`
        });
    }

    static editComment(req, res) {

        const type = req.params.type.split('s')[0];
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Incident.incidentOwner(id, type, req.userData.id);

        if (data) {
            if (data.status === 'draft') {
                data.comment = req.body.comment;
                return res.status(200).json({
                    status: 200,
                    data: [{
                        id: data.id,
                        message: `Updated ${type} record's comment`
                    }]
                });
            }
            return res.status(403).json({
                status: 403,
                error: `You are not allowed to change this comment`
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} incident with id: ${id} found`
        });
    }
}

export default IncidentController;