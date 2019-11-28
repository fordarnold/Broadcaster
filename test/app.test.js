import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/app";

const { expect } = chai;

chai.use(chaiHttp);

/**
 * TEST SUITES AND TEST CASES
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

describe("API Server - Starter Tests", () => {

	it("should welcome the user to the API server", done => {

		chai.request(app)
			.get("/")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.equals(200);
				expect(res.body.message).to.equals("Broadcaster API Server welcomes you!");
				done();
			});
	});

	it("should return an error response for missing urls", done => {

        chai.request(app)
            .get("/missing")
            .end((err, res) => {
            	expect(res).to.have.status(404);
            	expect(res.body.status).to.equals(404);
            	expect(res.body.error).to.equals("API endpoint was not found");
                done();
            });
    });

});
