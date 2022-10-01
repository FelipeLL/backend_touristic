import "dotenv/config";

export const Config = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  cookiesExpire: process.env.JWT_COOKIE_EXPIRES,
  bucketName: process.env.BUCKET_NAME,
  endpoint: process.env.ENDPOINT,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  cdn: process.env.CDN,
};
