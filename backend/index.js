const express = require("express")
const application = express()
const bodyparser = require("body-parser")
const cors = require('cors');
const uploadService = require('./controllers/uploadController');
const authenticationService = require('./controllers/authenticationController');
const downloadService = require('./controllers/downloadController');
const cookies = require("cookie-parser");
const upload = require("express-fileupload");
application.use(bodyparser.urlencoded({
    extended: true
}));

// application.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Private-Network', true);
//     next();
// });

require('dotenv').config();
var corsOptions = {
    credentials: true,
    origin: 'http://3.110.196.36:3000' };
application.use(cors(corsOptions));
application.use(cookies())
application.use(bodyparser.json({limit: '2mb'}))
application.use(upload());
application.use("/upload", uploadService);
application.use("/authenticate", authenticationService);
application.use("/download", downloadService);
application.listen(4000, () => {
    console.log("server started at port ", 4000);
})


