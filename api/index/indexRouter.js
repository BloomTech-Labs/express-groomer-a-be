const express = require('express');
const router = express.Router();

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/**
 * @swagger
 * /:
 *  get:
 *    description: root path returning status
 *    tags:
 *      - status
 *    produces:
 *      - applicaiton/json
 *    responses:
 *      200:
 *        description: status is up
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - api
 *              properties:
 *                api:
 *                  type: boolean
 *                  example: true
 *                timestamp:
 *                  type: date
 *                  example: 1293847921387
 */
router.get('/', function (req, res) {
  res.status(200).json({ api: 'up', timestamp: Date.now() });
});

module.exports = router;
