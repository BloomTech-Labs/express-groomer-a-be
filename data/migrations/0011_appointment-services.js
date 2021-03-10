exports.up = async (knex) => {
  await knex.schema.createTable('appointment_service', (table) => {
    table.increments('id').primary();
    table
      .integer('item_id')
      .references('cart_id')
      .inTable('appointment_cart')
      .onDelete('cascade')
      .onUpdate('cascade')
      .notNull();
    table.integer('service_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('appointment_service');
};
