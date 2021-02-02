/* eslint-disable prettier/prettier */
const express = require('express');
const authRequired = require('../middleware/authRequired');
const petsModel = require('./petsModel');
const router = express.Router();
const upload = require('../../services/image-upload');
const singleUpload = upload.single('image');


/******************************************************************************
 *                      GET all of an existing customers pets
 ******************************************************************************/
router.get('/', authRequired, async (req, res) => {
  try {
    const data = await petsModel.getAll(req.query.customer_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

/******************************************************************************
 *                      GET an existing customers pet by pet id
 ******************************************************************************/
router.get('/:id', authRequired, async (req, res) => {
  try {
    const data = await petsModel.getById(req.query.customer_id, req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

/******************************************************************************
 *                      POST an existing customers pet
 ******************************************************************************/
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

/******************************************************************************
 *                      PUT an existing customers pet
 ******************************************************************************/
router.put('/:id', authRequired, async (req, res) => {
  try {
    const pet = await petsModel.getById(req.query.customer_id, req.params.id);
    if (pet !== undefined) {
      const new_data = await petsModel.update(req.query.customer_id, req.params.id, req.body);
      res.status(200).json({ message: 'Pet updated', Profile: new_data });
    } else {
      res.status(400).json({ message: 'Pet does not exist' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

/******************************************************************************
 *                      DELETE an existing customers pet
 ******************************************************************************/
router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID Required' });
    }
    await petsModel.remove(req.query.customer_id, req.params.id);
    res.status(200).json({ message: 'Pet was successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error: 500' });
  }
});

/******************************************************************************
 *                       POST pet photo by id
 ******************************************************************************/
router.post('/image-upload/:id', authRequired, async (req, res) => {
  let img;
  singleUpload(req, res, async () => {
    img = req.file.location;
    const pet = await petsModel.getById(req.query.customer_id, req.params.id);
    if (pet !== undefined) {
      const new_data = await petsModel.update(req.query.customer_id, req.params.id, {pet_image_url: img});
      res.status(200).json({ message: 'Pet updated', Profile: new_data });
    } else {
      res.status(400).json({ message: 'Pet does not exist' });
    }
  });
});
/******************************************************************************
 *                       POST pet photo by id
 ******************************************************************************/
router.post('/vaccination-upload/:id', authRequired, async (req, res) => {
  let img;
  singleUpload(req, res, async () => {
    img = req.file.location;
    const pet = await petsModel.getById(req.query.customer_id, req.params.id);
    if (pet !== undefined) {
      const new_data = await petsModel.update(req.query.customer_id, req.params.id, {vaccination_image_url: img});
      res.status(200).json({ message: 'Pet updated', Profile: new_data });
    } else {
      res.status(400).json({ message: 'Pet does not exist' });
    }
  });
});

module.exports = router;
