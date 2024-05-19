
var jwt = require("jsonwebtoken");
var validator = require('validator');
const getCurrentDate = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var currentDateTime =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day) +
    " " +
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);

  console.log(currentDateTime);
  return {current: currentDateTime, year: year, month: month, day: day, hours: hours, minutes: minutes};
};

const validateEmailPass = (email, password, res) => {
  if(!validator.isEmail(email)){
    res
      .status(401).json({
        error: true,
        msg: "Please enter correct email",
      })
    return false;
  }
  if(validator.isEmpty(password)){
    res
    .status(401).json({
      error: true,
      msg: "Please enter password",
    })
  return false;
  }
  return true
}
const authenticateToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY, (err, dt) => {
      if (err) {
        reject(err)
      }
      else {
        console.log(dt)
        resolve(dt);
      }
    })
  })
  
}

module.exports = { getCurrentDate, validateEmailPass, authenticateToken };
