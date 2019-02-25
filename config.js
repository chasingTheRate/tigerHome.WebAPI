module.exports = {
  version: 'v1',
  port: process.env.PORT || 8083,
  env: process.env.NODE_ENV || 'development',
  development:
   {
     dbHost: process.env.DB_HOST_DEV,
     dbUsername: process.env.DB_USERNAME_DEV,
     dbPassword: process.env.DB_PASSWORD_DEV,
     dbDatabaseName: process.env.DB_DATABASE_DEV,
   },
   production:
   {
     dbHost: process.env.DB_HOST,
     dbUsername: process.env.DB_USERNAME,
     dbPassword: process.env.DB_PASSWORD,
     dbDatabaseName: process.env.DB_DATABASE,
   }
}