exports.seed = async function (knex) {
  await knex('services').insert([
    {
      id: 1,
      service_name: 'Bath',
    },
    {
      id: 2,
      service_name: 'Fur-Trimming',
    },
    {
      id: 3,
      service_name: 'Nail-Trimming',
    },
    {
      id: 4,
      service_name: 'Fur-Styling',
    },
    {
      id: 5,
      service_name: 'Ear Cleaning',
    },
    {
      id: 6,
      service_name: 'Nail Filing',
    },
    {
      id: 7,
      service_name: 'Nail-Capping',
    },
  ]);
};
