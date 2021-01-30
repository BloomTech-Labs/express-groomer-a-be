const express = require('express');
const router = express.Router();
const upload = require('../../services/image-upload');

const singleUpload = upload.single('image');

router.post('/', (req, res) => {
  singleUpload(req, res, (err) => {
    console.log(req.file);
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
