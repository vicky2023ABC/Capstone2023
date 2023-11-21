// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const { executeReadSql } = require('./utils')

const fetchUser = async (userId) => {
  parameters = [
    {
      name: 'user_id',
      value: { longValue: userId }
    }
  ]
  userSql = `SELECT user_id, username, height, weight from users where user_id = :user_id`
  const userResult = await executeReadSql(userSql, parameters)
  itemsSql = `SELECT item_id, owner_id, type, properties from items where owner_id = :user_id`
  const itemsResult = await executeReadSql(itemsSql, parameters)
  return {
    ...userResult[0],
    items: itemsResult
  }
}

module.exports = fetchUser