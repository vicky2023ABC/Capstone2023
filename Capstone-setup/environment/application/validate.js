// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const Joi = require('joi');

const extractError = (error) => {
  return error.details[0].message
}

// Request body validation for the POST /users endpoint
const validateCreateUser = (body) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(8).max(20).required(),
    username: Joi.string().min(4).max(20).required(),
    height: Joi.number().integer().min(60).max(84).required(),
    weight: Joi.number().integer().min(95).max(400).required(),
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    return {
      valid: false,
      message: extractError(result.error)
    }
  }
  return {
    valid: true
  }
}

module.exports = {
  validateCreateUser
}