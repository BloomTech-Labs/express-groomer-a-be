const db = require('../../data/db-config');

/******************************************************************************
 *                      DB object validation
 ******************************************************************************/

async function validGroomer(groom_id) {
    return db('groomer')
        .where('user_id', groom_id)
}
async function validCustomer(customer_id) {
    return db('customer')
        .where('user_id', customer_id)
}


/******************************************************************************
 *                      DB Locating specific data
 ******************************************************************************/

async function appointmentID(customer_id, id) {
    return db('scheduling')
        .where('customer_id', customer_id)
        .andWhere('id', id)
        .returning('*');
};

async function newAppointment(customer_id, groom_id, startTime) {
    return db('scheduling')
        .select('transaction')
        .where('customer_id', customer_id)
        .andWhere('groom_id', groom_id)
        .andWhere('startTime', startTime)
};

async function specificApp(date, startTime) {
    return db('scheduling')
        .where('date', date)
        .andWhere('startTime', startTime)
        .andWhere('confirmation', '=', true)
};

async function findAppointmentsByCustomerId(customer_id) {
    return db('scheduling')
        .where('customer_id', customer_id)
        .returning('*');
};

async function findAppointmentsByGroomerId(groom_id) {
    return db('scheduling')
        .where('groom_id', groom_id)
        .returning('*');
};

async function findAppointmentsByRelation(customer_id, groom_id) {
    return db('scheduling')
        .where('customer_id', customer_id)
        .andWhere('groom_id', groom_id)
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
            'groomer.zip_code')
        .where('customer_id', customer_id)
        .andWhere('date', date);
};

/******************************************************************************
*                      Appointment request joins
******************************************************************************/


async function getAppointmentsGroomer(groom_id) {
    return db('customer')
        .innerJoin('scheduling', 'scheduling.customer_id', 'customer.user_id')
        .innerJoin('groomer', 'groomer.user_id', 'scheduling.groom_id')
        .select(
            'scheduling.transaction',
            'scheduling.customer_id',
            'customer.given_name',
            'customer.family_name',
            'customer.phone_number',
            'customer.address',
            'customer.city',
            'customer.state',
            'customer.zip_code',
            'customer.country',
            'scheduling.date',
            'scheduling.startTime',
            'scheduling.endTime',
            'scheduling.confirmation',
        )
        .where('scheduling.groom_id', groom_id)
};

async function getAppointmentsCustomer(customer_id) {
    return db('groomer')
        .innerJoin('scheduling', 'scheduling.groom_id', 'groomer.user_id')
        .innerJoin('customer', 'customer.user_id', 'scheduling.customer_id')
        .select(
            'scheduling.transaction',
            'scheduling.groom_id',
            'groomer.business_name',
            'groomer.given_name',
            'groomer.family_name',
            'groomer.phone_number',
            'groomer.address',
            'groomer.city',
            'groomer.state',
            'groomer.zip_code',
            'groomer.country',
            'groomer.email',
            'scheduling.date',
            'scheduling.startTime',
            'scheduling.endTime',
            'scheduling.confirmation',
        )
        .where('scheduling.customer_id', customer_id)
};

async function getAppointmentItems(value) {
    return db('services')
        .innerJoin('appointment_service', 'appointment_service.service_id', 'services.id')
        .select('services.service_name')
        .where('appointment_service.item_id', value)
};

/******************************************************************************
 *                      DB inserts/updates
 ******************************************************************************/

async function addAppointment(newApp) {
    return db('scheduling').insert(newApp).returning('*')
};

async function addCart(transaction) {
    return db('appointment_cart').insert({ cart_id: transaction })
};

async function addItems(item, transaction) {
    await db('appointment_service')
        .insert({ item_id: transaction, service_id: item })
    return getAppointmentItems(item)
};

async function updateConfirmation(customer_id, groom_id, start, confirmation) {
    return db('scheduling')
        .where('customer_id', customer_id)
        .andWhere('groom_id', groom_id)
        .andWhere('startTime', start)
        .update({ confirmation: confirmation });
}

async function remove(customer_id, groom_id) {
    return db('scheduling')
        .where('customer_id', customer_id)
        .andWhere('groom_id', groom_id)
        .del();
}



module.exports = {
    addAppointment,
    validGroomer,
    findAppointmentsByCustomerId,
    findAppointmentsByRelation,
    findAppointmentsByGroomerId,
    findAppointmentsByDate,
    remove,
    updateConfirmation,
    validCustomer,
    appointmentID,
    getAppointmentsGroomer,
    getAppointmentsCustomer,
    getAppointmentItems,
    specificApp,
    newAppointment,
    addCart,
    addItems,
}