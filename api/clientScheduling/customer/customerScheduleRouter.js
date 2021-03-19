/* global formattedServices:writable */
const schedule = require('../schedulingModel');
const router = require('express').Router({ mergeParams: true });
router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET ALL appointments by customer_id
 ******************************************************************************/
router.get('/', async (req, res) => {
  const { customer_id } = req.params;
  const appointments = await schedule.getAppointmentsCustomer(customer_id);
  const validCustomer = await schedule.validCustomer(customer_id);
  if (!validCustomer.length) {
    res.status(400).json({ error: `No customer found by ID: ${customer_id}` });
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
 *                      GET appointments by customer/groomer relation
 ******************************************************************************/
router.get('/:groom_id', async (req, res) => {
  const { customer_id, groom_id } = req.params;
  const appointments = await schedule.findAppointmentsByRelation(
    customer_id,
    groom_id
  );
  const validCustomer = await schedule.validCustomer(customer_id);
  if (!validCustomer.length) {
    res.status(400).json({ error: `No customer found by ID: ${customer_id}` });
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
 *                      POST new appointment
 ******************************************************************************/
router.post('/:groom_id', async (req, res) => {
  try {
    const { customer_id, groom_id } = req.params;
    const { date, startTime, endTime, services } = req.body;
    const invalidInput = !date || !startTime || !endTime;

    if (invalidInput) {
      return res
        .status(400)
        .json({ message: 'Appointment fields are required' });
    }

    const newApp = {
      customer_id,
      groom_id,
      date,
      startTime,
      endTime,
    };

    const existing = await schedule.specificApp(date, startTime);

    if (existing.length) {
      return res.status(409).json({
        message: 'Appointment date/time not available (slot not vacant).',
      });
    } else {
      const appointment = await schedule.addAppointment(newApp);
      const transaction = appointment[0].transaction;
      await schedule.addCart(transaction);
      await services.forEach(async (item) =>
        schedule.addItems(item, transaction)
      );

      res.status(200).json({
        data: appointment,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *   PUT appointments ( Customer driven appointment edit (resets confirmation!) )
 ******************************************************************************/

 router.put('/confirm/:groom_id', async (req, res) => {
  try {
    const { customer_id, groom_id } = req.params;
    const { date, startTime, services} = req.body;

    if (!groom_id || !customer_id) {
      return res.status(400).json({
        message:
          'Groomer id, customer id required!',
      });
    }

    const updateData = {
      date: date,
      startTime: startTime,
      confirmation: null,
    };

    const data = await schedule.findAppointmentsAppUpdate(
      customer_id,
      groom_id
    );

    if (data.length) {
      const id = data[0].transaction
      const updApp = await schedule.updateAppointment(
        id, updateData, services
      );

      return res.status(200).json({
        message: "Appointment updated, confirmation pending.", updApp
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
