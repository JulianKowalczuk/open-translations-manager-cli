import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: { filename: process.env.SQLITEDBPATH || 'otm.sqlite' },
  useNullAsDefault: true
});

export default db;
