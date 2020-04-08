const mysql = require('mysql2');

require('dotenv').config();

const {
  SHOPPING_LIST_DB_USER,
  SHOPPING_LIST_DB_PASS,
  SHOPPING_LIST_DB_HOST,
  SHOPPING_LIST_DB_DEV_DB_NAME,
  SHOPPING_LIST_DB_TEST_DB_NAME,
  NODE_ENV,
} = process.env;

const dbName = NODE_ENV === 'development' ? SHOPPING_LIST_DB_DEV_DB_NAME : SHOPPING_LIST_DB_TEST_DB_NAME;

const connection = mysql.createConnection({
  host: SHOPPING_LIST_DB_HOST,
  user: SHOPPING_LIST_DB_USER,
  password: SHOPPING_LIST_DB_PASS,
});

connection.connect((err) => {
  if (err) throw err;
  connection.query(`DROP SCHEMA ${dbName}`, (err, result) => {
    if (err && err.code === 'ER_DB_DROP_EXISTS') {
      console.log('Already deleted');
      process.exit(0);
    }

    if (err) throw err;

    console.log('Deleted db');
    process.exit(0);
  });
});
