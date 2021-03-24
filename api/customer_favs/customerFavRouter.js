const authRequired = require('../middleware/authRequired');
const favs = require('./customerFavModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET ALL customer fav's by user id
 ******************************************************************************/
router.get('/', authRequired, async (req, res) => {
  try {
    const { customer_id: id } = req.params;

    const data = await favs.getFavsById(id);

    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      POST customer favorite by ID
 ******************************************************************************/

router.post('/:groom_id', authRequired, async (req, res) => {
  try {
    const { customer_id, groom_id } = req.params;

    if (!groom_id) {
      return res.status(404).json({ message: 'Missing required id(groomer).' });
    }

    const fav = await favs.findFavByUsers(customer_id, groom_id);
    const invalid = await favs.isCustomer(groom_id);
    const findGroom = await favs.findGroom(groom_id);

    if (invalid.length) {
      return res.status(409).json({
        message: 'Customers can NOT favorite another customer!',
      });
    }

    if (!findGroom.length) {
      return res.status(409).json({
        message: 'No groomer found by said ID',
      });
    }

    if (fav.length) {
      return res.status(409).json({
        message: 'This groomer is already a favorite!',
      });
    }

    const newFav = { customer_id, groom_id };
    await favs.addFav(newFav);

    res.status(200).json(newFav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/******************************************************************************
 *                      DELETE customer favorite by ID
 ******************************************************************************/
router.delete('/:groom_id', authRequired, async (req, res) => {
  try {
    const { customer_id, groom_id } = req.params;

    const findGroom = await favs.findGroom(groom_id);

    if (!groom_id) {
      return res.status(404).json({ message: 'Missing required id(groomer).' });
    }

    if (!findGroom.length) {
      return res.status(409).json({
        message: 'No groomer found by said ID',
      });
    }

    await favs.remove(customer_id, groom_id);

    res.status(200).json({ message: `Groomer removed from favorites!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
