require('dotenv').config();
const Sequelize = require('sequelize');

const {
  SHOPPING_LIST_DB_USER,
  SHOPPING_LIST_DB_PASS,
  SHOPPING_LIST_DB_HOST,
  SHOPPING_LIST_DB_DEV_DB_NAME,
  SHOPPING_LIST_DB_TEST_DB_NAME,
  SHOPPING_LIST_DB_PROD_DB_NAME,
  NODE_ENV,
} = process.env;

const databaseCredentials = {
  development: {
    username: SHOPPING_LIST_DB_USER,
    password: SHOPPING_LIST_DB_PASS,
    database: SHOPPING_LIST_DB_DEV_DB_NAME,
    host: SHOPPING_LIST_DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: SHOPPING_LIST_DB_USER,
    password: SHOPPING_LIST_DB_PASS,
    database: SHOPPING_LIST_DB_TEST_DB_NAME,
    host: SHOPPING_LIST_DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: SHOPPING_LIST_DB_USER,
    password: SHOPPING_LIST_DB_PASS,
    database: SHOPPING_LIST_DB_PROD_DB_NAME,
    host: SHOPPING_LIST_DB_HOST,
    dialect: 'mysql',
  },
};

const { username, password, database, host, dialect } = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

module.exports.connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port: 3306,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
