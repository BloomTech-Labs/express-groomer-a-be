exports.seed = async function (knex) {
  await knex('services').insert([
    {
      service_name: 'Bath',
    },
    {
      service_name: 'Fur-Trimming',
    },
    {
      service_name: 'Nail-Trimming',
    },
    {
      service_name: 'Fur-Styling',
    },
    {
      service_name: 'Ear Cleaning',
    },
    {
      service_name: 'Nail Filing',
    },
    {
      service_name: 'Nail-Capping',
    },
  ]);
};
