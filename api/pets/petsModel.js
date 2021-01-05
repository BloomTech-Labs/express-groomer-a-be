/* eslint-disable prettier/prettier */
const db = require('../../data/db-config');

const getAll = async (customer_id) => {
  return await db('pets').where('customer_id', customer_id).select('*');
};

// This one chooses the pet by id, where the customer ID matches and the ID matches the required id
const getById = async (customer_id, id) => {
  return db('pets').where({
    customer_id: customer_id,
    id: id,
  }).first().select('*');
};

// get a customers pet by name
const getByName = async (customer_id, petName) => {
  return db('pets')
    .where({ customer_id })
    .where('pet_name', petName)
    .select('id');
};

const create = async (data) => {
  const newPet =  await db('pets').insert(data).returning('*');
  return newPet
};

const update = async (customer_id, id, data) => {
  return db('pets').where({
    customer_id: customer_id,
    id: id,
  }).first().update(data).returning('*');
};

const remove = async (customer_id, id) => {
  return db('pets').where({ customer_id: customer_id, id: id }).del();
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
};
