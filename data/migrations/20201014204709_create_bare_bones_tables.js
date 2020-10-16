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
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('pet_types', (table) => {
      table.string('breed').notNullable();
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('pets', (table) => {
      table.string('id').notNullable().unique().primary();
      table.string('name').notNullable()
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('services', (table) => {
      table.string('id').notNullable().unique().primary();
      table.string('service_name').notNullable()
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer_services', (table) => {
      table.string('groomer_id').references('id').inTable('groomers')
      table.string('services_id').references('id').inTable('services')
      table.int('services_price')
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('customer_pets_type', (table) => {
      table.string('customer_id').references('id').inTable('customer')
      table.string('pets_id').references('id').inTable('pets')
      table.string('pet_types').references('id').inTable('pet_types')
    })
  await knex.shema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').createTable('groomer_schedule', (table) => {
    table.string('id')
  })
};

exports.down = function (knex) {
  await knex.schema.dropTableIfExists("customer_pets_type");
  await knex.schema.dropTableIfExists("groomer_services");
  await knex.schema.dropTableIfExists("services");
  await knex.schema.dropTableIfExists("pets");
  await knex.schema.dropTableIfExists("pet_types");
  await knex.schema.dropTableIfExists("customer");
  await knex.schema.dropTableIfExists('groomer')
};
