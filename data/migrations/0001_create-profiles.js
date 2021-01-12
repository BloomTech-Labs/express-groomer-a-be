exports.up = async (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
      table.string('role').notNullable();
    });
};

exports.down = async (knex) => {
  await knex.raw('DROP TABLE profiles CASCADE')
  // knex.schema.dropTableIfExists('profiles');
};
