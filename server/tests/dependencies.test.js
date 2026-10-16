import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

test('production API dependencies load with the configured ES module server', () => {
  assert.equal(typeof express, 'function');
  assert.equal(typeof mongoose.connect, 'function');
  assert.equal(typeof bcrypt.compare, 'function');
  assert.equal(typeof jwt.sign, 'function');
  assert.equal(typeof nodemailer.createTransport, 'function');
});
