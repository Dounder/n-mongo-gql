export const ENV_CONFIG = () => ({
  dbUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  dbPass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  dbName: process.env.MONGO_INITDB_DATABASE,
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
  state: process.env.STATE,
  jwtKey: process.env.JWT_SECRET,
});
