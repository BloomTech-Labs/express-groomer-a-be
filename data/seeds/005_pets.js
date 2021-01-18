/* eslint-disable prettier/prettier */
exports.seed = async function (knex) {
  await knex('pets').insert([
    {
      customer_id: '00ultwz1n9ORpNFc04x6',
      pet_name: 'Fido',
      pet_picture: '',
      pet_breed: 'Chihuahua',
      pet_color: 'Golden',
      pet_gender: 'Male',
      spay_neuter: true,
      special_requests: 'Please give him a little cowboy bandana',
      pet_temperament: 'Gentle',
      shots_current: true,
    },
  ]);
};
