// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')

const rdsdataservice = new AWS.RDSDataService();
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.resolve( __dirname, 'users.json'));
const users = JSON.parse(raw)
const values = users.map((user) => { return `('${user.username}', ${user.height}, ${user.weight})`}).join(',\n')
const sql = `INSERT INTO users (username, height, weight) VALUES ${values}`

const params = {
  resourceArn: process.env.DATABASE_ARN,
  secretArn: process.env.SECRET_ARN,
  sql
}

rdsdataservice.executeStatement(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log('Users inserted successfully!')
  }
})
