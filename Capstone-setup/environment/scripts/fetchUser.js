// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')

const rdsdataservice = new AWS.RDSDataService();

const fetchUser = async (userId) => {
  const params = {
    resourceArn: process.env.DATABASE_ARN,
    secretArn: process.env.SECRET_ARN,
    includeResultMetadata: true,
    sql: 'SELECT user_id, username, height, weight from users where user_id = :user_id',
    parameters: [
      {
        name: 'user_id',
        value: { longValue: userId }
      }
    ]
  }
  const results = await rdsdataservice.executeStatement(params).promise()
  return results
}

fetchUser(22).then((results) => console.log(JSON.stringify(results, null, 2)))