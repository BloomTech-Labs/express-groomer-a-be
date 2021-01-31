const db = require('../../data/db-config');

const getAll = async () => {
  return db('groomer');
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
