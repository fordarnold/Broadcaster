import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/app";

chai.should();
chai.use(chaiHttp);

const sampleUsers = [
	{
	    firstname: 'First',
	    lastname: 'User 1',
	    email: 'userone@gmail.com',
	    phoneNumber: '0728000001',
	    username: 'userone',
	    password: 'jadhg234'
	}, {
	    firstname: 'Second',
	    lastname: 'User 2',
	    email: 'usertwo@yahoo.com',
	    phoneNumber: '0788013465',
	    username: 'usertwo',
	    password: 'sdjk@sdjkh'
	}, {
	    firstname: 'Third',
	    email: 'userthree@helloworld.com',
	    phoneNumber: '0787276836',
	    username: 'userthree',
	    password: 'adsfkjgjky$888'
	}, {
	    firstname: 'Fourth',
	    lastname: 'User 4',
	    email: 'userfour@example.com',
	    phoneNumber: '0788333777',
	    username: 'userfour',
	    password: 'aefsdfPWOndbb'
	}
];

/**
 * Test Suites and Test Cases
 *
 * ~https://www.robinwieruch.de/node-js-testing-mocha-chai
 * -----------------------------------------------------------------
 *
 * 	describe('test suite', () => {
 * 		it('test case', () => {	
 *			...
 *		});
 *	});
 *
 * -----------------------------------------------------------------
 */

describe('API Endpoint: /api/v1/auth/signup', () => {

	it("should create a new user account", done => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send(sampleUsers[0])
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("message", "User created successfully");
                res.body.should.be.a("object");
                done();
            });
    });

    it("should not create a new user if email exists", done => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send(sampleUsers[1])
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property(
                    "error",
                    "The email for this user already exists"
                );
                done();
            });
    });

    it("should not create a new user if username exists", done => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send(sampleUsers[3])
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property(
                    "error",
                    `${sampleUsers[3].username} username already exists`
                );
                done();
            });
    });

    it("should not create a new user if there is a validation error", done => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send(sampleUsers[2])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                done();
            });
    });

});

describe('API Endpoint: /api/v1/auth/signin', () => {

	it("should signin a user with an account", done => {
        chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: sampleUsers[1].email, password: sampleUsers[1].password })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("data");
                res.body.data.should.have.property("token");
                res.body.should.have.property(
                    "message",
                    "User is successfully logged in"
                );
                done();
            });
    });

	it("should not signin a user who does not have an account", done => {
        chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: sampleUsers[2].email, password: sampleUsers[2].password })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property(
                    "error",
                    "Auth failed"
                );
                done();
            });
    });

    it("should not signin a user if authentication failed", done => {
        chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: sampleUsers[2].email, password: sampleUsers[2].password })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Auth failed");
                done();
            });
    });

    it("should not sign in a user with wrong password", done => {
        chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: sampleUsers[1].email, password: sampleUsers[2].password })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Wrong password");
                done();
            });
    });

    it("should not signin a user if there is a validation error", done => {
        chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: 'errormail2008gmail.com', password: sampleUsers[2].password })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                done();
            });
    });

});