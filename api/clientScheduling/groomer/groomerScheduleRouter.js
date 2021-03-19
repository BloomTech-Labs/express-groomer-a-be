/* global formattedServices:writable */
const schedule = require('../schedulingModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET ALL appointments by groomer_id
 ******************************************************************************/
router.get('/', async (req, res) => {
  const { id: groom_id } = req.params;
  const appointments = await schedule.getAppointmentsGroomer(groom_id);
  const validGroomer = await schedule.validGroomer(groom_id);
  if (!validGroomer.length) {
    res.status(400).json({ error: `No groomer found by ID: ${groom_id}` });
  } else {
    res.status(200).json(
      await Promise.all(
        appointments.map(async (appointment) =>
          schedule
            .getAppointmentItems(appointment.transaction)
            .then((services) => {
              formattedServices = services.map(
                (service) => service.service_name
              );
              return { ...appointment, ...{ transaction: formattedServices } };
            })
        )
      )
    );
  }
});

/******************************************************************************
 *                     GET appointments by customer/groomer relation
 ******************************************************************************/

router.get('/:customer_id', async (req, res) => {
  const { id: groom_id, customer_id } = req.params;
  const appointments = await schedule.findAppointmentsByRelation(
    customer_id,
    groom_id
  );
  const validGroomer = await schedule.validGroomer(groom_id);
  if (!validGroomer.length) {
    res.status(400).json({ error: `No groomer found by ID: ${groom_id}` });
  } else {
    res.status(200).json(
      await Promise.all(
        appointments.map(async (appointment) =>
          schedule
            .getAppointmentItems(appointment.transaction)
            .then((services) => {
              formattedServices = services.map(
                (service) => service.service_name
              );
              return { ...appointment, ...{ transaction: formattedServices } };
            })
        )
      )
    );
  }
});

/******************************************************************************
 *                     PUT appointments ( groomer appointment confirmation! )
 ******************************************************************************/

router.put('/confirm/:customer_id', async (req, res) => {
  try {
    const { id: groom_id, customer_id } = req.params;
    const { confirmation, start, date } = req.body;

    if (!start || !date) {
      return res.status(400).json({
        message:
          'Appointment time and date required!',
      });
    }
    const confirmations = ['accepted','declined','pending','canceled']
    
    if (!confirmations.includes(confirmation)) {
      return res
        .status(400)
        .json({ message: 'Confirmation of (accepted, declined, pending, canceled) ONLY' });
    }

    const data = await schedule.appConfirmationSearch(
      customer_id,
      groom_id,
      date,
      start
    );

    if (data.length) {
      await schedule.updateConfirmation(
        customer_id,
        groom_id,
        start,
        date,
        confirmation
      );
      return res.status(200).json({
        message: 
        `Appointment ${confirmation}`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
