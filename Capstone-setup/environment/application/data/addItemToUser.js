// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const { executeWriteSql } = require('./utils')

const types = [
  'PRESTAMO_AUTO',
  'PRESTAMO_HIPOTECARIO',
  'PRESTAMO_PERSONAL',
  'PRESTAMO_ESTUDIOS'
]

const addItemToUser = async (username) => {
  const itemType = types[Math.floor(Math.random()*types.length)]
  let properties
  if (itemType == 'PRESTAMO_AUTO') {
    properties = { tasa_interes_e: Math.floor(Math.random() * 10) + 1  }
  } else if (itemType == 'PRESTAMO_HIPOTECARIO') {
    properties = { tasa_interes_a: Math.floor(Math.random() * 10) + 1  }
  } else if (itemType == 'PRESTAMO_PERSONAL') {
    properties = { tasa_interes_h: Math.floor(Math.random() * 10) + 1  }
  } else if (itemType == 'PRESTAMO_ESTUDIOS') {
    properties = { tasa_interes_p: Math.floor(Math.random() * 10) + 1  }
  }
  writeSql = `INSERT INTO items (item_id, owner_id, type, properties) \
VALUES (DEFAULT, (SELECT user_id from users where username = :username), :type, :properties) \
RETURNING item_id, owner_id, type, properties`
  writeParameters = [
    {
      name: 'username',
      value: { stringValue: username }
    },
    {
      name: 'type',
      value: { stringValue: itemType}
    },
    {
      name: 'properties',
      value: { stringValue: JSON.stringify(properties)}
    }

  ]
  const writeResult = await executeWriteSql(writeSql, writeParameters)
  return writeResult[0]
}

module.exports = addItemToUser
