const uuid = require('uuid/v1');
const peripheralsTableName = 'peripherals';

exports.up = function(knex, Promise) {
  return Promise.all(
    [
      knex.schema.createTable(peripheralsTableName, table => {
        table.uuid('id').primary();
        table.string('ipAddress').nullable();
        table.string('name').nullable();
        table.string('description').nullable();
        table.uuid('roomId').nullable();
        table.string('macNumber').nullable();
      })
      .then(() => {
        return knex(peripheralsTableName).insert(
          {
            id: uuid(),
            ipAddress: '999.999.999.999',
            name: 'fake peripheral',
            description: 'raspberry pi 3',
            roomId: uuid(),
            macNumber: '1234567890',
          }
        )
      })
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(peripheralsTableName);  
};
