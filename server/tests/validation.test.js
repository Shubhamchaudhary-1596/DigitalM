const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidEmail, isValidSlug } = require('../lib/validation');

test('accepts ordinary email addresses and rejects malformed values', () => {
  assert.equal(isValidEmail('hello@example.com'), true);
  assert.equal(isValidEmail('person.name+tag@example.co.in'), true);
  assert.equal(isValidEmail('missing-at.example.com'), false);
  assert.equal(isValidEmail('bad@@example.com'), false);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail(null), false);
});

test('accepts URL-safe slugs and rejects unsafe or malformed slugs', () => {
  assert.equal(isValidSlug('seo'), true);
  assert.equal(isValidSlug('local-seo-2026'), true);
  assert.equal(isValidSlug('UPPERCASE'), false);
  assert.equal(isValidSlug('two words'), false);
  assert.equal(isValidSlug('-leading-hyphen'), false);
  assert.equal(isValidSlug('trailing-hyphen-'), false);
  assert.equal(isValidSlug('../admin'), false);
  assert.equal(isValidSlug(null), false);
});
