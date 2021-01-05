exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE profiles CASCADE');
  await knex.raw('TRUNCATE TABLE services CASCADE');
};
