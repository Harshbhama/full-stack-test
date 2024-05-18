const express = require('express')
const router = express.Router();
const { imageConversion } = require('./helpers/imageProcessing');
const { imageQueues } = require('./helpers/imageQueue');
router.post('/uploadImage', async (req, res) => {
  const name = req.files.file?.name?.replace(/\.[^/.]+$/, "")
  const base64String = req.files.file?.data.toString('base64');
  imageQueues('2', base64String, name);
  res.json({
    error: "false",
    msg: "File uploaded successfully in queue"
  }).status(200);
})

router.post('/test', async (req, res) => {
  const userID = req.body.id;
  await imageQueues(userID);
})

module.exports = router;