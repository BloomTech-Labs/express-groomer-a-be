const express = require('express');
const authRequired = require('../middleware/authRequired');
const services = require('./servicesModel');
const router = express.Router();

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET all services
 ******************************************************************************/
router.get('/', async (req, res) => {
  try {
    const data = await services.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      GET service by id
 ******************************************************************************/
router.get('/:id', async (req, res) => {
  try {
    const data = await services.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      POST a service
 ******************************************************************************/
router.post('/', authRequired, async (req, res) => {
  try {
    //checking to see if service already exists
    const service = await services.getByName(req.body.service_name);
    if (service === undefined) {
      //if undefined add service
      const new_service = await services.create(req.body);
      res
        .status(200)
        .json({ message: 'Services created', Profile: new_service });
    } else {
      res.status(400).json({ message: 'Service already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      PUT a service
 ******************************************************************************/
router.put('/:id', authRequired, async (req, res) => {
  try {
    //checking to see if service already exists
    const service = await services.getByName(req.body.service_name);
    if (service === undefined) {
      //if not undefined update user
      const edits = await services.update(req.params.id, req.body);
      res.status(200).json({ message: 'Services updated', Profile: edits });
    } else {
      res.status(400).json({ message: 'Service does not exist' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      DELETE a service
 ******************************************************************************/
router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Missing required id.' });
    }
    await services.remove(req.params.id);
    res.status(200).json({ message: 'Service was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
