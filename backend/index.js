const express = require("express")
const application = express()
const bodyparser = require("body-parser")
const cors = require('cors');
const uploadService = require('./controllers/uploadController');
const authenticationService = require('./controllers/authenticationController');
const cookies = require("cookie-parser");
const upload = require("express-fileupload");
application.use(bodyparser.urlencoded({
    extended: true
}));

application.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Private-Network', true);
    next();
});

require('dotenv').config();
var corsOptions = {
    origin: 'http://localhost:3000' };
application.use(cors(corsOptions));
application.use(cookies())
application.use(bodyparser.json({limit: '2mb'}))
application.use(upload());
application.use("/upload", uploadService);
application.use("/authenticate", authenticationService);

application.listen(4000, () => {
    console.log("server started at port ", 4000);
})
const schedule = require('node-schedule');
const date = new Date(2024, 4, 19, 18, 45);
console.log("date",date)
const job = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});