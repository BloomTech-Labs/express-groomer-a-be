/* eslint-disable prettier/prettier */
const db = require('../../data/db-config');

const getAll = async (customer_id) => {
  return await db('pets').where('customer_id', customer_id).select('*');
};

// This one chooses the pet by id, where the customer ID matches and the ID matches the required id
const getById = async (customer_id, id) => {
  return await db('pets').where({customer_id: customer_id, id: id}).first().select('*');
};

const create = async (data) => {
  return await db('pets').insert(data).returning('*')
};

const update = async (customer_id, id, data) => {
  return await db('pets').where({customer_id: customer_id, id: id}).first().update(data).returning('*');
};

const remove = async (customer_id, id) => {
  return await db('pets').where({customer_id: customer_id, id: id}).del();
};

module.exports = {
  getAll,
  getById,
  create,
  update, 
  remove,
};