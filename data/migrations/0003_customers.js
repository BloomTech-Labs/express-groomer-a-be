exports.up = async (knex) => {
  await knex.schema.createTable('customer', (table) => {
    table.increments('id');
    table
      .string('user_id')
      .unique()
      .references('id')
      .inTable('profiles')
      .onDelete('cascade')
      .onUpdate('cascade');
    table.string('given_name').notNull();
    table.string('family_name').notNull();
    table.varchar('phone_number').notNull();
    table.varchar('address');
    table.varchar('city');
    table.varchar('state');
    table.varchar('zip_code');
    table.varchar('country');
    table.string('vet_name');
    table.string('vet_number');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('customer');
};
