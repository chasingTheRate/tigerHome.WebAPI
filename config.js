module.exports = {
  version: 'v1',
  port: process.env.PORT || 8083,
  env: process.env.NODE_ENV || 'development',
  rabbitMqUrl: process.env.RABBIT_MQ_URL,
  development:
   {
     dbHost: process.env.DB_HOST,
     dbUsername: process.env.DB_USERNAME,
     dbPassword: process.env.DB_PASSWORD,
     dbDatabaseName: process.env.DB_DATABASE,
   },
   production:
   {
     dbHost: process.env.DB_HOST,
     dbUsername: process.env.DB_USERNAME,
     dbPassword: process.env.DB_PASSWORD,
     dbDatabaseName: process.env.DB_DATABASE,
   }
}