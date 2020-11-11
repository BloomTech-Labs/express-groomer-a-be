const db = require('../../data/db-config');

const getAll = async () => {
  return await db('services');
};

const getById = async (id) => {
  return await db('services').where('id', id).first().select('*');
};

const create = async (data) => {
  return await db('services').insert(data).returning('*');
};

const update = async (id, data) => {
  return await db('services')
    .where('id', id)
    .first()
    .update(data)
    .returning('*');
};

const remove = async (id) => {
  return await db('services').where('id', id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
