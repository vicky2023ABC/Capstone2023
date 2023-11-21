// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')

const rdsdataservice = new AWS.RDSDataService();
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.resolve( __dirname, 'items.json'));
const items = JSON.parse(raw)
const values = items.map((item) => { return `('${item.owner_id}', '${item.type}', '${item.properties}')`}).join(',\n')
const sql = `INSERT INTO items (owner_id, type, properties) VALUES ${values}`

const params = {
  resourceArn: process.env.DATABASE_ARN,
  secretArn: process.env.SECRET_ARN,
  sql
}

rdsdataservice.executeStatement(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log('Items inserted successfully!')
  }
})
