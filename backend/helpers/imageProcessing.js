var Jimp = require("jimp");
const { getCurrentDate } = require('./utils');
const imageConversion = async (file, name) => {
  const buffer = Buffer.from(file, 'base64');
  return new Promise((resolve, reject) => {
    try{
      Jimp.read(buffer)
        .then((image) => {
          image
          .resize(400, 400) // resize
          .write(`${__dirname}/../images/${name}.png`); // save
          resolve(true)
        })
        .catch((err) => {
          // Handle an exception.
          console.log("err",err)
          reject(err);
        });
    }catch(err){
      console.log("err",err);
      reject(err);
    }
  })
  
}
module.exports =  { imageConversion: imageConversion}