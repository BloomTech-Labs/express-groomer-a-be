const express = require('express');
const authRequired = require('../middleware/authRequired');
const groomer_services = require('./groomerServicesModel');
const router = express.Router();

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET all groomers services
 ******************************************************************************/
router.get('/', async (req, res) => {
  console.log('test');
  try {
    const data = await groomer_services.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await groomer_services.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      POST  groomer service
 ******************************************************************************/
router.post('/', authRequired, async (req, res) => {
  try {
    const isInTable = await groomer_services.checkIfExists(
      req.body.services_id,
      req.body.groomer_id
    );
    if (isInTable === undefined) {
      const groomer_service = await groomer_services.create(req.body);
      res
        .status(200)
        .json({ message: 'Service created', Service: groomer_service });
    } else {
      res.status(400).json({ message: 'Service already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      PUT groomer service
 ******************************************************************************/
router.put('/:id', authRequired, async (req, res) => {
  try {
    const edits = await groomer_services.update(
      req.params.id,
      req.query.service,
      req.body
    );
    res
      .status(200)
      .json({ message: 'Groomer service updated', Profile: edits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      DELETE groomer service
 ******************************************************************************/
router.delete('/:id', authRequired, async (req, res) => {
  try {
    await groomer_services.remove(req.params.id, req.query.service);
    res.status(200).json({ message: 'Service was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
