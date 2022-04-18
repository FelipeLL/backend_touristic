import "dotenv/config";

export const Config = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  cookiesExpire: process.env.JWT_COOKIE_EXPIRES
};
