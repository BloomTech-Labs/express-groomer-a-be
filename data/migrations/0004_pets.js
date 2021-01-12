exports.up = async (knex) => {
  await knex.schema.createTable('pets', (table) => {
    table.increments('id');
    table
      .string('customer_id')
      .references('user_id')
      .inTable('customer')
      .onDelete('cascade')
      .onUpdate('cascade');
    table.varchar('pet_name').notNull();
    table.varchar('pet_picture');
    table.varchar('pet_breed').notNull();
    table.varchar('pet_color');
    table.varchar('pet_gender').notNull();
    table.boolean('spay_neuter').notNull();
    table.varchar('special_requests', 5000);
    table.varchar('pet_temperament', 500);
    table.boolean('shots_current').notNull();
    table.string('avatarUrl');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('pets');
};
