module.exports = {
  // server config
  port: 3000,
  name: "inventory-backend",
  env: process.env.NODE_ENV,
  base_uri: process.env.BASE_URI,
  host: process.env.HOST,

  // mongodb config
  mongo_host: process.env.MONGO_HOST,
  mogo_port: process.env.MONGO_PORT,
  mongo_dbname: process.env.MONGO_DBNAME,

  // jwt config
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  salt_work_factor: process.env.SALT_WORK_FACTOR,

  // aws-sdk config
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_region: process.env.AWS_REGION,
  aws_email_user: process.env.AWS_EMAIL_USER,

  // email config
  password_reset_subject: process.env.PASSWORD_RESET_SUBJECT,
};
