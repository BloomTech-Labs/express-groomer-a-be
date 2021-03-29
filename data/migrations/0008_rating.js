exports.up = async (knex) => {
  await knex.schema.createTable('rating', (table) => {
    table.increments('id');
    table
      .string('customer_id')
      .references('user_id')
      .inTable('customer')
      .onDelete('cascade')
      .onUpdate('cascade')
      .notNull();
    table
      .string('groom_id')
      .references('user_id')
      .inTable('groomer')
      .onDelete('cascade')
      .onUpdate('cascade')
      .notNull();
    table.float('rate').notNull();
    table.string('comment', 180);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('rating');
};
