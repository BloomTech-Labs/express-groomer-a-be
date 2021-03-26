const ratings = require('./ratingsModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET ALL ratings by groomer id
 ******************************************************************************/

router.get('/', async (req, res) => {
  try {
    const { id: groom_id } = req.params;

    if (!groom_id) {
      return res.status(400).json({ message: 'Groomer ID required!' });
    }

    const invalid = await ratings.findGroom(groom_id);

    if (!invalid.length) {
      return res.status(409).json({
        message: 'No groomer found by said ID',
      });
    }

    const data = await ratings.findRatingByGroomer(groom_id);

    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                     GET total groomer rating vote count (not average)
 ******************************************************************************/
router.get('/count', async (req, res) => {
  try {
    const { id: groom_id } = req.params;

    if (!req.body) {
      return res.status(400).json({ message: 'Groomer ID required!' });
    }

    const invalid = await ratings.findGroom(groom_id);

    if (!invalid.length) {
      return res.status(409).json({
        message: 'No groomer found by said ID',
      });
    }

    const data = await ratings.getRatingCount(groom_id);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                     GET groomer rating (final average)
 ******************************************************************************/
router.get('/average', async (req, res) => {
  try {
    const { id: groom_id } = req.params;

    if (!groom_id) {
      return res.status(400).json({ message: 'Groomer ID required!' });
    }

    const invalid = await ratings.findGroom(groom_id);

    if (!invalid.length) {
      return res.status(409).json({
        message: 'No groomer found by said ID',
      });
    }

    const data = await ratings.getRatingsAvg(groom_id);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *           POST/PUT a rating ( if rating relation exists, PUT is triggered)
 ******************************************************************************/

router.post('/:customer_id', async (req, res) => {
  try {
    const { id: groom_id, customer_id } = req.params;
    const { rate, comment } = req.body;
    const newRating = { customer_id, groom_id, rate, comment };

    if (comment.length > 180) {
      return res.status(400).json({
        message: 'Please reduce review comment to 180 characters or less.',
      });
    }

    if (!(rate <= 5 && rate >= 0)) {
      return res.status(400).json({ message: 'Rating must be float(0-5)!' });
    }

    const invalidGroom = await ratings.findGroom(groom_id);

    if (!invalidGroom.length) {
      return res.status(409).json({
        message: 'No groomer found by said ID',
      });
    }

    const rated = await ratings.findRatingByUsers(customer_id, groom_id);

    if (rated.length) {
      await ratings.updateRating(customer_id, groom_id, rate, comment);
      return res.status(200).json({ message: 'Rating updated!' });
    }

    await ratings.addRating(newRating);

    res.status(200).json({ message: 'new rating posted!', newRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
