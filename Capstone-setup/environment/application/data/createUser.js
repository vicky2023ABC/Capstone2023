// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const { executeWriteSql } = require('./utils')

const createUser = async (username, height, weight) => {
  sql = `INSERT INTO users (user_id, username, height, weight) \
VALUES (DEFAULT, :username, :height, :weight) \
RETURNING user_id, username, height, weight`
  parameters = [
    {
      name: 'username',
      value: { stringValue: username }
    },
    {
      name: 'height',
      value: { longValue: height}
    },
    {
      name: 'weight',
      value: { longValue: weight}
    }
  ]
  const result = await executeWriteSql(sql, parameters)
  return result[0]
}

module.exports = createUser