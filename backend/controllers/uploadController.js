const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
var validator = require("validator");
const { imageConversion } = require("../helpers/imageProcessing");
const { imageQueues } = require("../helpers/imageQueue");
const { authenticateToken } = require("../helpers/utils");
const { checkImagesForUser, deleteDbImages } = require("../db/uploadDb");
const { imageKitMethod } = require("../helpers/imageKitUpload");
router.post("/uploadImage", async (req, res) => {
  const inputProps = req.headers?.["inputdata"];

  const token = req.cookies.token || req.body.token;
  if (validator.isEmpty(req.files.file?.name)) {
    res.status(401).json({
      error: true,
      msg: "Error in uploading file",
    });
    return false;
  }
  try {
    console.log("inputProps", inputProps);
    const parsed = JSON.parse(inputProps);
    console.log("parsed", parsed);
    const timeString = parsed?.timeFormat;
    const [hours, minutes] = timeString.split(":");
    const { year, month, day } = parsed?.dateFormat;

    let tokeDetails = await authenticateToken(token);
    const userID = tokeDetails?.userId;
    const name = req.files.file?.name?.replace(/\.[^/.]+$/, "");
    const base64String = req.files.file?.data.toString("base64");
    await imageQueues(userID, base64String, name, {
      hours: hours,
      minutes: minutes,
      year: year,
      month: month,
      day: day,
    });
    res.status(200).json({
      error: false,
      msg: "File uploaded successfully in queue",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

router.post("/test", async (req, res) => {
  try {
    const token = req.body.token;
    let tokeDetails = await authenticateToken(token);
    const userID = tokeDetails?.userId;
  } catch (error) {
    console.log("error", error);
  }

  // await imageQueues(userID);
});

router.get("/images", async (req, res) => {
  try {
    const token = req.cookies.token || req.body.token;
    let tokeDetails = await authenticateToken(token);
    const userID = tokeDetails?.userId;
    let result = await checkImagesForUser(userID);
    res.status(200).json({
      error: false,
      msg: "Successfully fetched images",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

router.post("/delete/images", async (req, res) => {
  try {
    const token = req.cookies.token || req.body.token;
    let tokeDetails = await authenticateToken(token);
    const userID = tokeDetails?.userId;
    let result = await deleteDbImages(userID);
    if (result) {
      res.status(200).json({
        error: false,
        msg: "Successfully deleted images",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

module.exports = router;
