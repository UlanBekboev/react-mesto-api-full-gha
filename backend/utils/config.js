require('dotenv').config();

const { // eslint-disable-next-line
  NODE_ENV, JWT_SECRET, DB_HOST, PORT, SECRET,
} = process.env;

const DEV_SECRET = '18aff85b4d9b2cf750c6e130ac8f7b2edb5d6dc590153b795f95e59cd0d396ee';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/mestodb';
const DEV_PORT = 3001;

const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production' && SECRET ? SECRET : DEV_SECRET;

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
