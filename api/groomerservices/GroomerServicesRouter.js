const express = require('express');
const authRequired = require('../middleware/authRequired');
const groomer_services = require('./groomerServicesModel');
const router = express.Router();

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const data = await groomer_services.getServicesById(req.params.groomer_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authRequired, async (req, res) => {
  try {
    //checking to see if user already exists
    const user = await groomer_services.getById(req.body.user_id);
    if (user === undefined) {
      //if undefined add user
      const new_user = await groomer_services.create(req.body);
      res
        .status(200)
        .json({ message: 'Groomer service created', Profile: new_user });
    } else {
      res.status(400).json({ message: 'Service already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  try {
    //checking to see if user already exists
    const user = await groomer_services.getById(req.params.id);
    if (user !== undefined) {
      //if not undefined update user
      const edits = await groomer_services.update(req.params.id, req.body);
      res
        .status(200)
        .json({ message: 'Groomer service updated', Profile: edits });
    } else {
      res.status(400).json({ message: 'Service does not exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Missing required id.' });
    }
    await groomer_services.remove(req.params.id);
    res.status(200).json({ message: 'Service was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
