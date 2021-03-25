const express = require('express');
const router = express.Router();

router.get('/greeting', (req, res) => {
  // res.header('Content-Type', 'application/json');
  // res.send(JSON.stringify('Welcome to the Express Server'));
  res.status(200).json({ message: 'Welcome to the Express Server!' });
});

module.exports = router;
