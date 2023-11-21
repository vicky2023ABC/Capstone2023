// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')

const rdsdataservice = new AWS.RDSDataService();

const params = {
  resourceArn: process.env.DATABASE_ARN,
  secretArn: process.env.SECRET_ARN,
  sql: `CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
height INTEGER NOT NULL,
weight INTEGER NOT NULL
);

CREATE TABLE items (
item_id SERIAL PRIMARY KEY,
owner_id INTEGER REFERENCES users(user_id),
type VARCHAR(20) NOT NULL,
properties VARCHAR(512)
);`
}

rdsdataservice.executeStatement(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log('Tables created successfully!')
  }
})
