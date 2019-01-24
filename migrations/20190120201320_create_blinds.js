
const uuid = require('uuid/v1');

const blindsTableName = 'blinds';

exports.up = (knex, Promise) => {
  return Promise.all(
    [
      knex.schema.createTable(blindsTableName, table => {
        table.uuid('id').primary();
        table.string('ipAddress').nullable();
        table.string('name').nullable();
        table.integer('currentPosition').nullable();
        table.uuid('roomId').nullable();
        table.uuid('peripheralId').nullable();
        table.string('blindState').nullable();
        table.integer('port').nullable();
        table.integer('positionLimitOpen').nullable();
        table.integer('positionLimitClosed').nullable();
      })
      .then(() => {
        return knex(blindsTableName).insert(
          {
            id: uuid(),
            ipAddress: '999.999.999.999',
            name: 'fake blind',
            currentPosition: 0,
            roomId: null,
            blindState: 'closed',
            port: 0,
            positionLimitOpen: 90,
            positionLimitClosed: 360,
          }
        )
      })
    ])
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('blinds');
};
