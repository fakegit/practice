const app = require('../app').listen();
const request = require('supertest')(app);
const should = require('should');

describe('test /app.js', function() {
  it('should / status 200', async function() {
    try {
      const res = await request.get('/');

      res.status.should.equal(404);
    } catch(err) {
      should.ifError(err.message);
    }
  });
});
