const express = require('express');
const authRequired = require('../middleware/authRequired');
const groomer = require('./groomerModel');
const router = express.Router();
const upload = require('../../services/image-upload');
const singleUpload = upload.single('image');
const ratingsRouter = require('../Ratings/ratingsRouter');
const groomerScheduleRouter = require('../clientScheduling/groomer/groomerScheduleRouter');

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET all groomers
 ******************************************************************************/
router.get('/', async (req, res) => {
  try {
    const data = await groomer.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      GET groomer by user id
 ******************************************************************************/
router.get('/:id', async (req, res) => {
  try {
    const data = await groomer.getById(req.params.id);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      POST new groomer
 ******************************************************************************/
router.post('/', async (req, res) => {
  try {
    //checking to see if user already exists
    let user = undefined;
    if (req.body.user_id) {
      user = await groomer.getById(req.body.user_id);
    }
    if (user === undefined) {
      //if undefined add user
      const new_user = await groomer.create(req.body);
      res
        .status(200)
        .json({ message: 'Groomer profile created', Profile: new_user });
    } else {
      res.status(400).json({ message: 'Profile already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      PUT groomer by user id
 ******************************************************************************/
router.put('/:id', authRequired, async (req, res) => {
  try {
    //checking to see if user already exists
    const user = await groomer.getById(req.params.id);
    if (user !== undefined) {
      //if not undefined update user
      const edits = await groomer.update(req.params.id, req.body);
      res
        .status(200)
        .json({ message: 'Groomer profile updated', Profile: edits });
    } else {
      res.status(400).json({ message: 'Profile does not exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      DELETE groomer by id
 ******************************************************************************/
router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Missing required id.' });
    }
    await groomer.remove(req.params.id);
    res.status(200).json({ message: 'User was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                       POST groomer licence by id
 ******************************************************************************/
router.post('/license-upload/:id', authRequired, async (req, res) => {
  let img;
  singleUpload(req, res, async () => {
    img = req.file.location;
    const user = await groomer.getById(req.params.id);
    if (user !== undefined) {
      //if not undefined update user
      const edits = await groomer.update(req.params.id, {
        license_image_url: img,
      });
      res
        .status(200)
        .json({ message: 'Groomer profile updated', Profile: edits });
    } else {
      res.status(400).json({ message: 'Profile does not exists' });
    }
  });
});

router.use('/:id/ratings/', ratingsRouter);
router.use('/:id/groomerSchedule/', groomerScheduleRouter);
module.exports = router;
