const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, stopServer} = require('../server');

// Setup the expect syntax from chai
const expect = chai.expect;

// Setup chai HTTP layer testing middleware
chai.use(chaiHttp);

describe('************** API tests ************', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return stopServer();
  });

  describe('--- Static files ---', function() {
    it('index.html should be sent to the client on GET', function() {
      return chai.request(app)
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
        })
    });
  });
});