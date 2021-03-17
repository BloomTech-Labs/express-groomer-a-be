exports.seed = async function (knex) {
  await knex('rating').insert([
    {
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultx74kMUmEW8054x6',
      rate: 1,
      comment: 'They lost my freakin dog!',
    },
    {
      customer_id: '00ultwz1n9ORpNFc04x6',
      groom_id: '00ultwew80Onb2vOT4x6',
      rate: 5,
      comment: 'My dog is now the Brad Pitt of dogs!',
    },
    {
      customer_id: '00u13omswyZM1xVya4x7',
      groom_id: '00ultwew80Onb2vOT4x6',
      rate: 3,
      comment: 'Meh..',
    },
  ]);
};
