const express = require("express")
const application = express()
const bodyparser = require("body-parser")
const cors = require('cors');
const uploadService = require('./uploadController');
const cookies = require("cookie-parser");
const upload = require("express-fileupload");
application.use(bodyparser.urlencoded({
    extended: true
}));
require('dotenv').config();
var corsOptions = {
    origin: 'http://localhost:3000' };
application.use(cors(corsOptions));
application.use(bodyparser.json({limit: '2mb'}))
application.use(upload());
application.use("/upload", uploadService)
application.use(cookies())
application.listen(4000, () => {
    console.log("server started at port ", 4000);
})
