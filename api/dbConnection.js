

var dbConfig = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'yamaguchikotaro',
      password: '',
      database: 'kakeibo'
    }
  });

  module.exports = dbConfig;