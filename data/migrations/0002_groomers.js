exports.up = async (knex) => {
  await knex.schema.createTable('groomer', (table) => {
    table.increments('id');
    table
      .string('user_id')
      .unique()
      .references('id')
      .inTable('profiles')
      .onDelete('cascade')
      .onUpdate('cascade');
    table.string('business_name');
    table.string('given_name').notNull();
    table.string('family_name').notNull();
    table.varchar('phone_number').notNull();
    table.varchar('address').notNull();
    table.varchar('city').notNull();
    table.varchar('state').notNull();
    table.varchar('zip_code').notNull();
    table.varchar('country').notNull();
    table.varchar('email').notNull();
    table.varchar('about', 5000);
    table.varchar('hours', 5000);
    table.float('lat').notNull();
    table.float('lng').notNull();
    table.string('license_number');
    table.string('license_image_url');
    table.string('personal_calendly_link').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('groomer');
};
