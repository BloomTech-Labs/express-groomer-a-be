const db = require('../../data/db-config');

const getAll = async () => {
  return await db('customer');
};

const getById = async (id) => {
  return await db('customer').where('id', id).first().select('*');
};

const create = async (data) => {
  return await db('customer').insert(data).returning('*');
};

const update = async (id, data) => {
  return await db('costumer')
    .where('id', id)
    .first()
    .update(data)
    .returning('*');
};

const remove = async (id) => {
  return await db('customer').where('id', id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
