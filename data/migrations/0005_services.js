exports.up = async (knex) => {
  await knex.schema.createTable('services', (table) => {
    table.increments('id');
    table.string('service_name').notNull();
  });
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('services')
};
