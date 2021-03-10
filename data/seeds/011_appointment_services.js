exports.seed = async function (knex) {
  await knex('appointment_service').insert([
    {
      item_id: 1,
      service_id: 1,
    },
    {
      item_id: 1,
      service_id: 2,
    },
    {
      item_id: 2,
      service_id: 4,
    },
    {
      item_id: 3,
      service_id: 3,
    },
  ]);
};
