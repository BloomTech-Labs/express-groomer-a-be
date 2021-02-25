const db = require('../../data/db-config');


async function addAppointment(newAppointment) {
  return db('scheduling').insert(newAppointment).returning('*');
}

async function validGroomer(groom_id){
    return db('groomer')
    .where('user_id',groom_id)
}

async function findAppointmentsByCustomer(customer_id) {
  return db('scheduling')
    .where('customer_id', customer_id)
    .returning('*');
}

async function findAppointmentsByGroomerId(groom_id) {
    return db('scheduling')
      .where('groom_id', groom_id)
      .returning('*');
  }

async function findAppointmentsByRelation(customer_id, groom_id) {
    return db('scheduling')
      .where('customer_id', customer_id)
      .andWhere('groom_id', groom_id)
      .returning('*');
  }

async function updateConfirmation(customer_id, groom_id, start, confirmation){
    return db('scheduling')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id)
    .andWhere('startTime', start)
    .update({confirmation:confirmation})
}

async function remove(customer_id, groom_id) {
  return db('scheduling')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id)
    .del();
}

async function validCustomer(customer_id){
    return db('customer')
     .where('user_id', customer_id)
}

async function appointmentID(customer_id, id){
    return db('scheduling')
    .where('customer_id', customer_id)
    .andWhere('id', id)
    .returning('*');
}

module.exports = {
  addAppointment,
  validGroomer,
  findAppointmentsByCustomer,
  findAppointmentsByRelation,
  findAppointmentsByGroomerId,
  remove,
  updateConfirmation,
  validCustomer,
  appointmentID,
};