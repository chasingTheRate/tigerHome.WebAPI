module.exports = {
  version: 'v1',
  port: process.env.PORT || 8083,
  env: process.env.NODE_ENV || 'development',
  rabbitMqUrl: process.env.RABBIT_MQ_URL,
  dbConnection: process.env.DB_CONNECTION,
}