const db = require('../../data/db-config');


async function addRating(newRating) {
  return db('rating').insert(newRating).returning('*');
}

async function findRatingByUsers(customer_id, groom_id) {
    return db('rating')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id);
  }

async function findRatingByUser(groom_id) {
  return db('rating')
    .where('groom_id', groom_id)
}

async function getRatingsAvg(groom_id){
    return db('rating')
    .where('groom_id', groom_id)
    .avg('rate')
}

async function getRatingCount(groom_id){
    return db('rating')
    .where('groom_id', groom_id)
    .count('rate')
}

async function updateRating(customer_id, groom_id, rate){
    return db('rating')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id)
    .update({rate:rate})
}
module.exports = {
  addRating,
  findRatingByUser,
  getRatingsAvg,
  getRatingCount,
  findRatingByUsers,
  updateRating,
};
