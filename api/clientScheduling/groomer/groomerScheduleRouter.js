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
              return { ...appointment, ...{ cart: formattedServices } };
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
              return { ...appointment, ...{ cart: formattedServices } };
            })
        )
      )
    );
  }
});

/******************************************************************************
 *                     PUT appointments ( groomer appointment confirmation! )
 ******************************************************************************/

router.put('/confirm', async (req, res) => {
  try {
    const { id: groom_id } = req.params;
    const { confirmation, transaction_id } = req.body;
    const confirmations = ['accepted', 'declined', 'pending', 'canceled'];

    if (!transaction_id || !groom_id) {
      return res.status(400).json({
        message: 'Appointment transaction id and groomer_id required!',
      });
    }

    if (!confirmations.includes(confirmation)) {
      return res.status(400).json({
        message: 'Confirmation of (accepted, declined, pending, canceled) ONLY',
      });
    }

    const valid = await schedule.updateConfirmation(
      groom_id,
      transaction_id,
      confirmation
    );

    if (valid == 0) {
      console.log(valid);
      return res.status(400).json({
        message: `Could not find appointment by provided id of ${transaction_id}`,
      });
    }
    return res.status(200).json({
      message: `Appointment ${confirmation}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
