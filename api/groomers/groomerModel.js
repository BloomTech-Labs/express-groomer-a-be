const db = require('../../data/db-config');

const getAll = async () => {
  const groomers = await db('groomer');
  groomers.map((groomer) => {
    console.log(groomer.address);
    groomer.fullAddress = `${groomer.address.replace(/ /g, '+')}+${groomer.city.replace(/ /g, '+')}+${groomer.state.replace(/ /g, '+')}+${groomer.zip_code}`;
  });
  return groomers;
};

const getById = async (id) => {
  return db('groomer').where('user_id', id).first().select('*');
};

const create = async (data) => {
  return db('groomer').insert(data).returning('*');
};

const update = async (id, data) => {
  return db('groomer').where('user_id', id).first().update(data).returning('*');
};

const remove = async (id) => {
  return db('groomer').where('user_id', id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
