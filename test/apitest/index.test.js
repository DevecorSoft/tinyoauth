process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const url = 'http://localhost:3333';

chai.use(chaiHttp);

  after(function () {
    server.close();
  });

describe("helth check", () => {
    it('it should successfully done health check', (done) => {
        chai.request(url)
            .get('/health-check')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
});

describe("login", () => {
    it('it should successfully login', (done) => {
        chai.request(url)
            .post('/login')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
})