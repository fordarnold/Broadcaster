const incidents = [
    {
        id: 1,
        createdBy: 1, // user who owns this record
        title: "Red flag incident sample title",
        type: "red-flag", // red-flag, intervention
        location: "", // latitude & longitude coordinates
        status: "draft", // draft, under investigation, resolved, rejected
        images: ['Image 1', 'Image 2'],
        videos: ['Video 1', 'Video 2'],
        comment: "This is our first red-flag incident.",
        createdOn: new Date()
    }, 
    {
        id: 2,
        createdBy: 1,
        title: "Intervention incident sample title",
        type: "intervention",
        location: "",
        status: "draft",
        images: ['Image', 'Image'],
        videos: ['Video', 'Video'],
        comment: "This is our first intervention incident.",
        createdOn: new Date()
    }
];

class Incident {
    
    constructor({ title, location, comment }, type, userId, images, videos) {

        this.id = incidents.length + 1;
        this.createdBy = userId;
        this.title = title;
        this.type = type;
        this.location = location;
        this.status = 'draft';
        this.images = images;
        this.videos = videos;
        this.comment = comment;
        this.createdOn = new Date();
    }

    static createIncident(incident) {
        return incidents.push(incident);
    }

    static sameTypeIncident(userId, type) {
        return incidents.filter(incident => incident.type === type).filter(incident => incident.createdBy === parseInt(userId, 10));
    }

    static incidentExists(id, type) {
        return incidents.filter(incident => incident.type === type).find(incident => incident.id === parseInt(id, 10));
    }

    static incidentOwner(id, type, userId) {
        return incidents.filter(incident => incident.type === type).find(incident => incident.id === parseInt(id, 10) && incident.createdBy === parseInt(userId, 10));
    }

    static destroyIncident(incident) {
        return incidents.splice(incidents.indexOf(incident), 1);
    }
}

export default Incident;