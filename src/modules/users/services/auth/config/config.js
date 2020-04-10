require('dotenv').config();

const { SHOPPING_LIST_SESSION_NAME, SHOPPING_LIST_SESSION_PASS, NODE_ENV } = process.env;

const sessionCredentials = {
  development: {
    name: SHOPPING_LIST_SESSION_NAME,
    password: SHOPPING_LIST_SESSION_PASS,
  },
  test: {
    name: SHOPPING_LIST_SESSION_NAME,
    password: SHOPPING_LIST_SESSION_PASS,
  },
  production: {
    name: SHOPPING_LIST_SESSION_NAME,
    password: SHOPPING_LIST_SESSION_PASS,
  },
};

module.exports = { sessionCredentials: sessionCredentials[NODE_ENV] };
