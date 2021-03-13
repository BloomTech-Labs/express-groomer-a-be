exports.seed = async function (knex) {
  await knex('appointment_cart').insert([
    {
      cart_id: 1,
    },
    {
      cart_id: 2,
    },
    {
      cart_id: 3,
    },
  ]);
};
