const db = require('../../data/db-config');

const getAll = async () => {
  return await db('groomer_services');
};

const getById = async (id) => {
  return await db('groomer_services')
    .where('groomer_id', id)
    .first()
    .select('*');
};

const getServicesById = async (groomer_id, services_id) => {
  return await db('groomer_services')
    .where({ groomer_id: groomer_id, services_id: services_id })
    .select('*');
};

const create = async (data) => {
  return await db('groomer_services').insert(data).returning('*');
};

const update = async (id, data) => {
  return await db('groomer_services')
    .where('groomer_id', id)
    .first()
    .update(data)
    .returning('*');
};

const remove = async (id) => {
  return await db('groomer_services').where('groomer_id', id).del();
};

module.exports = {
  getAll,
  getById,
  getServicesById,
  create,
  update,
  remove,
};
