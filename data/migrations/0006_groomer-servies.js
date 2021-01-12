exports.up = async (knex) => {
  await knex.schema.createTable('groomers_services', (table) => {
    table
      .string('groomer_id')
      .references('user_id')
      .inTable('groomer')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .bigint('services_id')
      .references('id')
      .inTable('services')
      .onDelete('cascade')
      .onUpdate('cascade');
    table.decimal('services_price', 14, 2);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('groomers_services');
};
