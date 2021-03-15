exports.up = async (knex) => {
  await knex.schema.createTable('appointment_cart', (table) => {
    table.increments('id').primary();
    table
      .integer('cart_id')
      .unique()
      .references('transaction')
      .inTable('scheduling')
      .onDelete('cascade')
      .onUpdate('cascade')
      .notNull();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('appointment_cart');
};
