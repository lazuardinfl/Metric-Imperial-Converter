const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  // Convert a valid input such as 10L: GET request to /api/convert.
  test("Convert a valid input such as 10L", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.returnNum, 2.64172)
        assert.equal(res.body.returnUnit, "gal")
        done();
      })
  })
  // Convert an invalid input such as 32g: GET request to /api/convert.
  test("Try to convert an invalid input such as 32g", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      })
  })
  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  test("Try to convert an invalid input such as 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      })
  })
  // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  test("Try to convert an invalid input such as 3/7.2/4kilomegagram", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      })
  })
  // Convert with no number such as kg: GET request to /api/convert.
  test("Convert a valid input such as kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.returnNum, 2.20462)
        assert.equal(res.body.returnUnit, "lbs")
        done();
      })
  })
});