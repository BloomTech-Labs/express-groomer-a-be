const express = require('express');
const authRequired = require('../middleware/authRequired');
const favs = require('./customerFavModel');
const router = require("express").Router({ mergeParams: true });


router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/******************************************************************************
 *                      GET ALL customer fav's by user id
 ******************************************************************************/
router.get('/', async (req, res) => {
    try {
      const {user_id : id } = req.params;
      const data = await favs.getFavsById(id);
      console.log(data);
      res.status(200).json({data :data});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;