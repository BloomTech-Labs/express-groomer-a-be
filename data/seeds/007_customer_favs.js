exports.seed = async function (knex) {
  await knex('customer_favs').insert([
    {
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultx74kMUmEW8054x6',
    },
    {
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultwew80Onb2vOT4x6',
    },
    {
      customer_id: '00u13omswyZM1xVya4x7',
      groom_id: '00ultwew80Onb2vOT4x6',
    },
  ]);
};
