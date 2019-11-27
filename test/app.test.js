const app = require("../server/app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

chai.use(chaiHttp);

describe("Server!", () => {

	it("welcomes user to the api", done => {});

	it("adds 2 numbers", done => {});
});
