/* eslint-disable prettier/prettier */
const express = require('express');
const authRequired = require('../middleware/authRequired');
const petsModel = require('./petsModel');
const router = express.Router();

router.get('/', authRequired, async (req, res) => {
  try {
    const data = await petsModel.getAll(req.params.customer_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

router.get('/:id', authRequired, async (req, res) => {
  try {
    const data = await petsModel.getById(req.params.customer_id, req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

router.post('/:id', authRequired, async (req, res) => {
  const newPet = {
    ...req.body,
    customer_id: req.params.id,
  };
  try {
    const pet = await petsModel.getByName(req.params.id, newPet.pet_name);
    if (pet.length === 0) {
      const new_pet = await petsModel.create(newPet);
      res.status(200).json({ message: 'Pet profile added', Profile: new_pet });
    } else {
      res.status(400).json({ message: 'Pet already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  try {
    const pet = await petsModel.getById(req.params.customer_id, req.params.id);
    if (pet !== undefined) {
      const new_data = await petsModel.update(req.params.id, req.body);
      res.status(200).json({ message: 'Pet updated', Profile: new_data });
    } else {
      res.status(400).json({ message: 'Pet does not exist' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID Required' });
    }
    await petsModel.remove(req.params.id);
    res.status(200).json({ message: 'Pet was successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

module.exports = router;
