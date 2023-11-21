// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const express = require('express')
const bodyParser = require('body-parser')
const { createUser, fetchUser, addItemToUser } = require('./data')
const { createCognitoUser, login, verifyToken } = require('./auth')
const { validateCreateUser } = require('./validate')

const app = express()
app.use(bodyParser.json())

function wrapAsync(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
}
// Login
app.post('/login', wrapAsync(async (req, res) => {
  const idToken = await login(req.body.username, req.body.password)
  res.json({ idToken })
}))

// Create user
app.post('/users', wrapAsync(async (req, res) => {
  const validated = validateCreateUser(req.body)
  if (!validated.valid) {
    throw new Error(validated.message)
  }
  await createCognitoUser(req.body.username, req.body.password, req.body.email)
  const user = await createUser(req.body.username, req.body.height, req.body.weight)
  res.json(user)
}))

// Fetch user
app.get('/users/:userId', wrapAsync(async (req, res) => {
  const user = await fetchUser(req.params.userId)
  res.json(user)
}))

// Add item
app.post('/users/:username/items', wrapAsync(async (req, res) => {
  const token = await verifyToken(req.header('Authorization'))
  if (token['cognito:username'] != req.params.username) {
    throw new Error('Unauthorized')
  }
  const item = await addItemToUser(req.params.username)
  res.json(item)
}))

app.use(function(error, req, res, next) {
  res.status(400).json({ message: error.message });
});

module.exports = app
