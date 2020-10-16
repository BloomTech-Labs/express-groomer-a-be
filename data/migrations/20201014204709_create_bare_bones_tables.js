exports.up = async (knex) => {
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer', (table) => {
      table.string('id').notNullable().unique().primary();
      table.string('name');
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('customer', (table) => {
      table.string('id').notNullable().unique().primary();
      table.string('name');
  })
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('services', (table) => {
      table.string('id').notNullable().unique().primary();
      table.string('service_name').notNullable()
    })
  await knex.schema
  .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  .createTable('groomer_services', (table) => {
    table.string('groomer_id').references('id').inTable('groomers')
    table.string('services_id').references('id').inTable('services')
    table.int('services_price')
  })
};

exports.down = function (knex) {};
