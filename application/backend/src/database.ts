const knex = require('knex');
const { database } = require('./config');

export default knex({
  client: 'mysql2',
  connection: database,
});
