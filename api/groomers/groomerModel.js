const db = require('../../data/db-config');

const getAll = async () => {
  return await db('groomer');
};

const getById = async (id) => {
  return await db('groomer').where('user_id', id).first().select('*');
};

const create = async (data) => {
  return await db('groomer').insert(data).returning('*');
};

const update = async (id, data) => {
  return await db('groomer')
    .where('user_id', id)
    .first()
    .update(data)
    .returning('*');
};

const remove = async (id) => {
  return await db('groomer').where('user_id', id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
