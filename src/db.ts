import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: { filename: String(process.env.SQLITEDBPATH) },
  useNullAsDefault: true
});

export default db;
