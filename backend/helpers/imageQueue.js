const Queue = require('bull');
const { imageConversion } = require('./imageProcessing');
const { getCurrentDate } = require('./utils');
const { checkForUsersDb, uploadUserImageDb } = require('../db/uploadDb');
let users = ['1','2','3', '4']; // mock users

let queues = {};

const makeQueue = async () => {
  let usersFromDb = await checkForUsersDb();
  console.log("usersFromDb",usersFromDb)
  for(let i=0; i<usersFromDb.length; i++){
    queues[usersFromDb[i]?.id] = new Queue(`${usersFromDb[i]?.id}_image_processing`, 'redis://127.0.0.1:6379')
  }
  for(let key in queues){
    let imageQueue = queues[key]
    imageQueue.process(async function (job, done) {
      console.log("Processing started for Job id", job.id);
      await timeOut();
      try{
        await imageConversion(job.data.file, job.data.name)
        console.log("Done image conversion")
        done(null, {data: job.data, jobId: job.id});
      }catch(error){
        console.log("errrrrrrrr", error)
        done(null, {data: job.data, jobId: job.id, error: true});
        // done(new Error('error transcoding'));
      }
     
    });
    
    imageQueue.on('completed', async function (job, result) {
      console.log("completed")
      console.log("result", result?.data?.name)
      let path = result?.data?.name
      let userID = result?.data?.userID
      if(!result?.data?.error){
        await uploadUserImageDb(userID, path, true, "Published")
      }else{
        await uploadUserImageDb(userID, path, true, 'Error')
      }
      
    })
  }
}

const imageQueues = async (userID, file, name) => {
  let path =  `${name}_${getCurrentDate()}`
  queues[userID].add({file: file, name: path, userID: userID})
  await uploadUserImageDb(userID, path, false)
}

const timeOut = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    },5000)
  })
}
makeQueue();


module.exports = { imageQueues: imageQueues, makeQueue: makeQueue }