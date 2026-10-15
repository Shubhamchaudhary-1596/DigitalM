const test = require('node:test');
const assert = require('node:assert/strict');

test('production API dependencies load with the configured CommonJS server', () => {
  assert.equal(typeof require('express'), 'function');
  assert.equal(typeof require('mongoose').connect, 'function');
  assert.equal(typeof require('bcryptjs').compare, 'function');
  assert.equal(typeof require('jsonwebtoken').sign, 'function');
  assert.equal(typeof require('nodemailer').createTransport, 'function');
});
