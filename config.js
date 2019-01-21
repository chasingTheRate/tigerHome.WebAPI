module.exports = {
  version: 'v1',
  port: process.env.PORT || 8082,
  env: process.env.NODE_ENV || 'development',
  development:
   {
     dbHost: process.env.DB_DEV_HOST,
     dbUsername: process.env.DB_DEV_USERNAME,
     dbPassword: process.env.DB_DEV_PASSWORD,
     dbDatabaseName: process.env.DB_DEV_DATABASE,
   }
}