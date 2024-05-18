// var Jimp = require("jimp");
// const imageConversion = async (file) => {
//   const buffer = file?.data
//   const name = file?.name?.replace(/\.[^/.]+$/, "")
//   try{
//     Jimp.read(buffer)
//       .then((image) => {
//         image
//         .resize(400, 400) // resize
//         .write(`${__dirname}/../images/${name}_${new Date("YYYY-MM-DDTHH:mm:ss")}.png`); // save
//       })
//       .catch((err) => {
//         // Handle an exception.
//       });
//   }catch(err){
//     console.log("err",err);
//   }
// }

const getCurrentDate = () => {
  var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var currentDateTime = year + '-' +
                      (month < 10 ? '0' + month : month) + '-' +
                      (day < 10 ? '0' + day : day) + ' ' +
                      (hours < 10 ? '0' + hours : hours) + ':' +
                      (minutes < 10 ? '0' + minutes : minutes) + ':' +
                      (seconds < 10 ? '0' + seconds : seconds);

console.log(currentDateTime);
return currentDateTime;
}

module.exports = { getCurrentDate };