import chai from "chai";
import chaiHttp from "chai-http";
import fs from 'fs';
import path from 'path';

import app from "../server/app";

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

const testValidTokens = {
    savedUser: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTcyNjg4MzEwfQ.dNSwMfMy52oCz68W-ou3TPi88e6iy5s8kAwkzT4u0Pw',
    unsavedUser: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTcyNjg4MzEwfQ.dNSwMfMy52oCz68W-ou3TPi88e6iy5s8kAw5524Dtua',
    noIncidentUser: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydHJ0QGdtYWlsLmNvbSIsImlkIjoyLCJpYXQiOjE1NzI3NzIwOTB9.oZhkuh1fjUM-pEAKzxGskzbRPWLDES4LVOtXMLh9moI'
};

const testInvalidToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTcyNjg4MzEwfQ.dNSwMfMy52oCz68W-ou3TPi88e6iy5s8kAwkzT4u0Pw';

const sampleIncidents = [
    {
        title: "Incident One",
        location: "Latitude and Longitude",
        images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
        videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
        comment: "This is our first incident."
    }, 
    {
        title: "Incident One",
        location: "Latitude and Longitude",
        images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
        videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
        comment: "Second Incident"
    }, 
    {
        title: "",
        location: "Lat",
        images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
        videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
        comment: "Our third incident"
    }
];

describe('API Endpoint: POST /api/v1/:type', () => {

    it("should create a new red-flag when user has an account",
        async() => {
            const res = await chai.request(app)
                .post("/api/v1/red-flags")
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
                .field('title', sampleIncidents[0].title)
                .field('location', sampleIncidents[0].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', sampleIncidents[0].comment);
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.an('object');
        },
    );

    it("should create a new intervention when user has an account",
        async() => {
            const res = await chai.request(app)
                .post("/api/v1/interventions")
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
                .field('title', sampleIncidents[1].title)
                .field('location', sampleIncidents[1].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', sampleIncidents[1].comment);
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.an('object');
        },
    );

    it("should not create a new red-flag when user has no account", done => {
        chai.request(app).post("/api/v1/red-flags")
            .set("Authorization", `Bearer ${testValidTokens.unsavedUser}`)
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(sampleIncidents[0])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Sign up first please");
            });
        done();
    });
    it("should not create a new red-flag when user has not provided a token", done => {
        chai.request(app).post("/api/v1/red-flags")
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(sampleIncidents[0])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Please provide a token first");
            });
        done();
    });
    it("should create a new red-flag when user has an account",
        async() => {
            const res = await chai.request(app)
                .post("/api/v1/red-flags")
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
                .field('title', sampleIncidents[2].title)
                .field('location', sampleIncidents[2].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', sampleIncidents[2].comment);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
        },
    );
    it("should not create a new intervention when user has no account", done => {
        chai.request(app).post("/api/v1/interventions")
            .set("Authorization", `Bearer ${testValidTokens.unsavedUser}`)
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(sampleIncidents[1])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Sign up first please");
            });
        done();
    });
    it("should not create an entry with no image or video",
        async() => {
            const res = await chai.request(app)
                .post("/api/v1/red-flags")
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
                .field('title', sampleIncidents[0].title)
                .field('location', sampleIncidents[0].location)
                .field('comment', sampleIncidents[0].comment);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a("string");
        },
    );
});

describe('API Endpoint: GET /api/v1/:type', () => {
    it("should retrieve all red-flags posted by a user", done => {
        chai.request(app).get("/api/v1/red-flags")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("data");
            });
        done();
    });

    it("should retrieve all interventions posted by a user", done => {
        chai.request(app).get("/api/v1/interventions")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("data");
            });
        done();
    });

    it("should return 404 error if a user did not report a red-flag", done => {
        chai.request(app).get("/api/v1/red-flags")
            .set("Authorization", `Bearer ${testValidTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error", `No red-flag entries found`);
            });
        done();
    });

    it("should return 404 error if a user did not report an intervetnion", done => {
        chai.request(app).get("/api/v1/interventions")
            .set("Authorization", `Bearer ${testValidTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error", `No intervention entries found`);
            });
        done();
    });
});

describe('API Endpoint: GET /api/v1/:type/:id', () => {
    it("should retrieve entry with approrpiate type: red-flag", done => {
        chai.request(app).get("/api/v1/red-flags/1")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
                res.body.should.have.property("data");
            });
        done();
    });
    it("should retrieve entry with approrpiate type: intervention", done => {
        chai.request(app).get("/api/v1/interventions/2")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
                res.body.should.have.property("data");
            });
        done();
    });
    it("should not retrieve entry with inapprorpiate type: red-flag", done => {
        chai.request(app).get("/api/v1/red-flags/2")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 2 found');
            });
        done();
    });
    it("should not retrieve entry with inapprorpiate type: intervention", done => {
        chai.request(app).get("/api/v1/interventions/1")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No intervention entry with id: 1 found');
            });
        done();
    });
    it("should not retrieve unsaved red-flag entries", done => {
        chai.request(app).get("/api/v1/red-flags/1000")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1000 found');
            });
        done();
    });
    it("should not retrieve unsaved intervention entries", done => {
        chai.request(app).get("/api/v1/interventions/1000")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No intervention entry with id: 1000 found');
            });
        done();
    });
    it("should not retrieve entry with inapprorpiate id", done => {
        chai.request(app).get("/api/v1/interventions/1fgsgsdgsdfgfdsgf")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
            });
        done();
    });
    it("should not retrieve entry with invalid type", done => {
        chai.request(app).get("/api/v1/interves/1")
            .set("Authorization", `Bearer ${testValidTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error");
            });
        done();
    });
});



describe('API Endpoint: PATCH /api/v1/:type/location', () => {

    it("should let owner's entry location edit red-flag", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });

    it("should not let owner's entry edit location red-flag with invalid request", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1/location")
            .send({ comment: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should not let other users edit red-flag's location", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1 found');
                done();
            });
    });

    it("should not edit red-flag's location with wrong id", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1hghdfghd/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
                done();
            });
    });

    it("should not let owner's entry location with status different from draft", done => {
        chai.request(app)
            .patch("/api/v1/interventions/2/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'You are not allowed to change this location');
                done();
            });
    });
});

describe('API Endpoint: PATCH /api/v1/:type/comment', () => {

    it("should let owner's entry comment edit red-flag", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1/comment")
            .send({ comment: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data").with.lengthOf(1);
                done();
            });
    });

    it("should not let owner's entry edit comment of red-flag", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1/comment")
            .send({ location: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should not let other users edit red-flag's comment", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1/comment")
            .send({ comment: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1 found');
                done();
            });
    });

    it("should not edit red-flag's comment with wrong id", done => {
        chai.request(app)
            .patch("/api/v1/red-flags/1hghdfghd/comment")
            .send({ comment: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
                done();
            });
    });

    it("should not let owner's entry comment with status different from draft", done => {
        chai.request(app)
            .patch("/api/v1/interventions/2/comment")
            .send({ comment: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'You are not allowed to change this comment');
                done();
            });
    });
});

describe('API Endpoint: DELETE /api/v1/:type/:id', () => {

    it("should delete owner's entry", done => {
        chai.request(app)
            .delete("/api/v1/red-flags/1")
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
                res.body.should.have.property("message", `red-flag record has been deleted`);
            });
        done();
    });

    it("should not delete entry if user isn't owner", done => {
        chai.request(app)
            .delete("/api/v1/red-flags/1")
            .set("Authorization", `Bearer ${validTokens.noIncidentUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1 found');
                done();
            });
    });

    it("should not delete with invalid id", done => {
        chai.request(app)
            .delete("/api/v1/red-flags/365ydgg18327")
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
                done();
            });
    });

    it("should not delete entry without a token", done => {
        chai.request(app)
            .delete("/api/v1/interventions/2")
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Please provide a token first');
                done();
            });
    });

    it("should not delete entry with an invalid token", done => {
        chai.request(app)
            .delete("/api/v1/interventions/2")
            .set("Authorization", `Bearer ${testInvalidToken}`)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Authentication failed');
                done();
            });
    });

});