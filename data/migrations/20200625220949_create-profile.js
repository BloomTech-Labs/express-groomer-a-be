exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.timestamps(true, true);
      table.string('role').notNullable();
    });
};
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
