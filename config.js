module.exports = {
  version: 'v1',
  port: process.env.PORT || 8083,
  env: process.env.NODE_ENV || 'development',
  rabbitMqUrl: process.env.RABBIT_MQ_URL,
  dbHost: process.env.DB_HOST,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
}