exports.seed = async function (knex) {
  await knex('services').insert([
    {
      id: 1,
      service_name: 'Bath',
      duration: '01:00:00',
    },
    {
      id: 2,
      service_name: 'Fur-Trimming',
      duration: '00:45:00',
    },
    {
      id: 3,
      service_name: 'Nail-Trimming',
      duration: '00:15:00',
    },
    {
      id: 4,
      service_name: 'Fur-Styling',
      duration: '00:30:00',
    },
    {
      id: 5,
      service_name: 'Ear Cleaning',
      duration: '00:15:00',
    },
    {
      id: 6,
      service_name: 'Nail Filing',
      duration: '00:30:00',
    },
    {
      id: 7,
      service_name: 'Nail-Capping',
      duration: '00:30:00',
    },
  ]);
};
