const db = require('../../data/db-config');

const getAll = async () => {
  return await db('groomer_services');
};

const getById = async (id) => {
  return await db('groomer_services')
    .join('services', 'services.id', '=', 'groomer_services.services_id')
    .where('groomer_services.groomer_id', id)
    .select(
      'services.service_name',
      'services.id',
      'groomer_services.services_price'
    );
};

const checkIfExists = async (service_id, groomer_id) => {
  return await db('groomer_services')
    .where({ groomer_id: groomer_id, services_id: service_id })
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

const update = async (groomer_id, services_id, data) => {
  return await db('groomer_services')
    .where({ services_id: services_id, groomer_id: groomer_id })
    .first()
    .update(data)
    .returning('*');
};

const remove = async (groomer_id, services_id) => {
  return await db('groomer_services')
    .where({ services_id: services_id, groomer_id: groomer_id })
    .del();
};

module.exports = {
  getAll,
  getById,
  getServicesById,
  create,
  update,
  remove,
  checkIfExists,
};
