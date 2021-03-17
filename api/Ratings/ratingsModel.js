const db = require('../../data/db-config');

async function addRating(newRating) {
  return db('rating').insert(newRating).returning('*');
}

async function findRatingByUsers(customer_id, groom_id) {
  return db('rating')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id);
}

async function findRatingByGroomer(groom_id) {
  return db('rating').where('groom_id', groom_id);
}

async function getRatingsAvg(groom_id) {
  return db('rating').where('groom_id', groom_id).avg('rate');
}

async function getRatingCount(groom_id) {
  return db('rating').where('groom_id', groom_id).count('rate');
}

async function updateRating(customer_id, groom_id, rate, comment) {
  return db('rating')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id)
    .update({ rate: rate, comment: comment });
}

async function findGroom(groom_id) {
  return db('groomer').where('user_id', groom_id);
}

module.exports = {
  addRating,
  findRatingByGroomer,
  getRatingsAvg,
  getRatingCount,
  findRatingByUsers,
  updateRating,
  findGroom,
};
