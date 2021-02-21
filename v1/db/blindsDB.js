const debug = require('debug')('blindsDB');
const config = require('../../config');
const uuid = require('uuid');

console.log(
  {
    host : config.dbHost,
    user : config.dbUsername,
    password : config.dbPassword,
    database : config.dbName,
    port: config.dbPort,
  }
)

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : config.dbHost,
    user : config.dbUsername,
    password : config.dbPassword,
    database : config.dbName,
    port: config.dbPort,
  }
});

const getRecords = (fields, table) => {
  return knex.select(...fields).from(table);
}

const getAllBlindRecords = () => {
  return knex.select(
    'id',
    'name',
    'roomId',
    'blindState',
    'currentPosition',
    'ipAddress',
    'port',
    'positionLimitOpen',
    'positionLimitClosed')
    .from('blinds');
}

const getBlindWithId = (id) => {
  debug(`getBlindWithID - id: ${ id }`);
  return knex.select('*').from('blinds').where({ id });
}

const updateBlindState = (id, state, position) => {
  debug(`updateBlindState - id: ${ id }, state: ${ state }, position: ${ position }`);
  return knex('blinds').where({ id }).update({ blindState: state, currentPosition: position  })
}

const addBlind = (data) => {
  debug(`addBlind - data: ${ JSON.stringify(data, null, 1) }`);

  const { 
    ipAddress, 
    name = '', 
    roomId = null,
    blindState = 'unknown', 
    port: port, 
    currentPosition = 0,
    positionLimitOpen = 90,
    positionLimitClosed = 200
  } = data;

  // const blindid = uuid(); 
  return knex('blinds').insert({
    id: uuid(),
    ipAddress,
    name,
    roomId,
    blindState,
    port,
    currentPosition,
    positionLimitOpen,
    positionLimitClosed
  }, 'id')
}

const removeBlindWithID = (id) => {
  return knex('blinds')
  .where({ id })
  .del();
}

const setOpenAngleLimit = (id, angle) => {
  debug(`setOpenAngleLimit - id: ${ id }, angle: ${ angle }`);
  return knex('blinds').where({ id }).update({ positionLimitOpen: angle })
}

const setClosedAngleLimit = (id, angle) => {
  debug(`setClosedAngleLimit - id: ${ id }, angle: ${ angle }`);
  return knex('blinds').where({ id }).update({ positionLimitClosed: angle })
}

const status = (id) => {
  debug(`status - id: ${ id }`);
  return knex.select('blindState').from('blinds').where({ id });
}

const currentPosition = (id) => {
  debug(`Current Position - id: ${ id }`);
  return knex.select('currentPosition').from('blinds').where({ id });
}

const targetPosition = (id) => {
  debug(`Target Position - id: ${ id }`);
  return knex.select('targetposition').from('blinds').where({ id });
}

const setTargetPosition = (options) => {
  debug(`Target Position - id: ${ id }`);
  const { id, targetPosition } = options;
  return knex('blinds').where({ id }).update({ targetposition: targetPosition })
}

module.exports = {
  getRecords,
  getAllBlindRecords,
  getBlindWithId,
  updateBlindState,
  addBlind,
  removeBlindWithID,
  setOpenAngleLimit,
  setClosedAngleLimit,
  status,
  currentPosition,
  targetPosition,
  setTargetPosition
};
