const express = require('express');
const authRequired = require('../middleware/authRequired');
const customer = require('./customersModel.js');
const favoritesRouter = require('../customer_favs/customerFavRouter');
const customerScheduleRouter = require('../clientScheduling/customer/customerScheduleRouter');
const router = express.Router();

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET all customers
 ******************************************************************************/
router.get('/', authRequired, async (req, res) => {
  try {
    const data = await customer.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      GET customer by user id
 ******************************************************************************/
router.get('/:id', authRequired, async (req, res) => {
  try {
    const data = await customer.getById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ message: 'User does not exist/ Valid ID required' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      POST new customer
 ******************************************************************************/
router.post('/', authRequired, async (req, res) => {
  try {
    //checking to see if user already exists
    let user = undefined;
    if (req.body.user_id) {
      user = await customer.getById(req.body.user_id);
    }
    if (user === undefined) {
      //if undefined add user
      const new_user = await customer.create(req.body);
      res
        .status(200)
        .json({ message: 'Customer profile created', Profile: new_user });
    } else {
      res.status(400).json({ message: 'Profile already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      PUT customer by user id
 ******************************************************************************/
router.put('/:id', authRequired, async (req, res) => {
  try {
    //checking to see if user already exists
    const user = await customer.getById(req.params.id);
    if (user !== undefined) {
      //if not undefined update user
      const edits = await customer.update(req.params.id, req.body);
      res
        .status(200)
        .json({ message: 'Customer profile updated', Profile: edits });
    } else {
      res.status(400).json({ message: 'Profile does not exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      DELETE customer by user id
 ******************************************************************************/
router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Missing required id.' });
    }
    await customer.remove(req.params.id);
    res.status(200).json({ message: 'User was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.use('/:customer_id/favorites/', favoritesRouter);
router.use('/:customer_id/customerSchedule/', customerScheduleRouter);
module.exports = router;
