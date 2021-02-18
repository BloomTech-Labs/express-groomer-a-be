exports.up = async (knex) => {
    await knex.schema.createTable('customer_favs', (table) => {
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
        .unique()
        .references('user_id')
        .inTable('groomer')
        .onDelete('cascade')
        .onUpdate('cascade');
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('customer_favs');
  };
  