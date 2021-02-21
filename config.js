module.exports = {
  version: 'v1',
  port: process.env.PORT || 8083,
  env: process.env.NODE_ENV || 'development',
  rabbitMqUrl: process.env.RABBIT_MQ_URL,
  dbHost: process.env.PGHOST,
  dbUsername: process.env.PGUSER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.PGDATABASE,
  dbPort: process.env.PGPORT,
}