const db = require('../../data/db-config');

const getFavsById = async (id) => {
  return db('groomer')
    .innerJoin('customer_favs', 'customer_favs.groom_id', 'groomer.user_id')
    .innerJoin('customer', 'customer.user_id', 'customer_favs.customer_id')
    .select(
      'groomer.user_id',
      'groomer.business_name',
      'groomer.given_name',
      'groomer.family_name',
      'groomer.phone_number',
      'groomer.address',
      'groomer.city',
      'groomer.state',
      'groomer.zip_code',
      'groomer.country',
      'groomer.email',
      'groomer.about'
    )
    .where('customer.user_id', id);
};

async function addFav(newFav) {
  return db('customer_favs').insert(newFav).returning('*');
}

async function isCustomer(groom_id) {
  return db('customer').where('user_id', groom_id);
}

async function findFavByUsers(customer_id, groom_id) {
  return db('customer_favs')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id);
}

async function remove(customer_id, groom_id) {
  return db('customer_favs')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id)
    .del();
}

async function findGroom(groom_id) {
  return db('groomer').where('user_id', groom_id);
}

module.exports = {
  getFavsById,
  addFav,
  findFavByUsers,
  remove,
  isCustomer,
  findGroom,
};
