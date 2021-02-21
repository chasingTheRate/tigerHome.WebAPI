const { Client } = require('pg')
const config = require('../../config');

const client = new Client({
  user: config.dbUsername,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
})

const getAllBlindRecords = async () => {
  client.connect()
  const results = await client.query('SELECT * FROM public.blinds');
  return results.rows;
}

module.exports = {
  getAllBlindRecords
}