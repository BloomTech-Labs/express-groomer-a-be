const db = require('../../data/db-config');


async function addAppointment(newAppointment) {
  return db('scheduling').insert(newAppointment).returning('*');
}

async function validGroomer(groom_id){
    return db('groomer')
    .where('user_id',groom_id)
}

async function findAppointmentsByCustomerId(customer_id) {
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

async function findDataByCustomerName(groom_id, given_name) {
    return db('scheduling')
    .innerJoin('customer', 'customer.given_name', db.raw('?', [given_name]))
    .select(
    'scheduling.given_name',
    'customer.family_name',
    'scheduling.customer_id',
    'scheduling.confirmation',
    'scheduling.date',
    'scheduling.startTime',
    'scheduling.endTime',
    'scheduling.services',
    'customer.phone_number',
    'customer.city',
    'customer.state',
    'customer.vet_name',
    'customer.vet_number')
    .where('groom_id', groom_id)
  };


async function findDataByGroomerBusiness(customer_id, business_name) {
    return db('scheduling')
    .innerJoin('groomer', 'groomer.business_name', 'scheduling.business_name')
    .select(
    'scheduling.business_name',
    'scheduling.given_name',
    'scheduling.confirmation',
    'scheduling.date',
    'scheduling.startTime',
    'scheduling.endTime',
    'scheduling.services',
    'groomer.phone_number',
    'groomer.city',
    'groomer.state',
    'groomer.address',
    'groomer.zip_code',)
    .where('scheduling.business_name', business_name)
    .andWhere('scheduling.customer_id', customer_id)
  };

async function findAppointmentsByDate(customer_id, date) {
    return db('scheduling')
    .innerJoin('groomer', 'groomer.business_name', 'scheduling.business_name')
    .select(
    'scheduling.business_name',
    'scheduling.given_name',
    'scheduling.confirmation',
    'scheduling.date',
    'scheduling.startTime',
    'scheduling.endTime',
    'scheduling.services',
    'groomer.phone_number',
    'groomer.city',
    'groomer.state',
    'groomer.address',
    'groomer.zip_code',)
    .where('customer_id', customer_id)
    .andWhere('date', date);
  };



async function updateConfirmation(customer_id, groom_id, start, confirmation){
    return db('scheduling')
    .where('customer_id', customer_id)
    .andWhere('groom_id', groom_id)
    .andWhere('startTime', start)
    .update({confirmation:confirmation});
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
  findAppointmentsByCustomerId,
  findDataByCustomerName,
  findAppointmentsByRelation,
  findAppointmentsByGroomerId,
  findDataByGroomerBusiness,
  findAppointmentsByDate,
  remove,
  updateConfirmation,
  validCustomer,
  appointmentID,
};