module.exports = {
  version: 'v1',
  port: process.env.PORT || 8083,
  env: process.env.NODE_ENV || 'development',
  development:
   {
     dbHost: process.env.DB_HOST || '192.168.86.201',
     dbUsername: process.env.DB_USERNAME,
     dbPassword: process.env.DB_PASSWORD,
     dbDatabaseName: process.env.DB_DATABASE,
   }
}