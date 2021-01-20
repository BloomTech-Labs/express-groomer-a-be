const db = require('../../data/db-config');

const getAll = async () => {
  return await db('services');
};

const getByName = async (name) => {
  return db('services').where('service_name', name).first().select('*');
};

const create = async (data) => {
  console.log(data);
  return db('services').insert(data).returning('*');
};

const update = async (id, data) => {
  return db('services').where('id', id).first().update(data).returning('*');
};

const remove = async (id) => {
  return db('services').where('id', id).del();
};

module.exports = {
  getAll,
  getByName,
  create,
  update,
  remove,
};
