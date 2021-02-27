const db = require('../../data/db-config');

const getAll = async () => {
  return await db('customer');
};

const getById = async (id) => {
  return db('customer').where('user_id', id).first().select('*');
};

const create = async (data) => {
  return db('customer').insert(data).returning('*');
};

const findCustomerName = async (given_name, family_name) =>{
  return db('customer')
  .where('given_name', given_name)
  .andWhere('family_name', family_name)
  .select('user_id')
}

const update = async (id, data) => {
  return db('customer')
    .where('user_id', id)
    .first()
    .update(data)
    .returning('*');
};

const remove = async (id) => {
  return db('customer').where('user_id', id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  findCustomerName
};
