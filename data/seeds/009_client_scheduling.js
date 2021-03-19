exports.seed = async function (knex) {
  await knex('scheduling').insert([
    {
      transaction: 1,
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultx74kMUmEW8054x6',
      date: '10-18-2021',
      startTime: '13:30:00',
      endTime: '00:00:00',
    },
    {
      transaction: 2,
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultwqjtqt4VCcS24x6',
      date: '04-21-2021',
      startTime: '15:00:00',
      endTime: '00:00:00',
    },
    {
      transaction: 3,
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultx74kMUmEW8054x6',
      date: '10-30-2021',
      startTime: '12:00:00',
      endTime: '00:00:00',
    },
  ]);
};
