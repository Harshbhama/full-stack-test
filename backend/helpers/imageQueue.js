const Queue = require('bull');
const { imageConversion } = require('./imageProcessing');
const { getCurrentDate } = require('./utils');
const schedule = require('node-schedule');
const { checkForUsersDb, uploadUserImageDb } = require('../db/uploadDb');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let queues = {};

const makeQueue = async () => { // This function is called at initialization and every time new user is registered.
  let usersFromDb = await checkForUsersDb(); // Making Queues for each user.
  for(let i=0; i<usersFromDb.length; i++){
    queues[usersFromDb[i]?.id] = new Queue(`${usersFromDb[i]?.id}_image_processing`, process.env.REDIS_URL)
  }
  console.log("Changes to test restart");
  console.log("usersFromDb",usersFromDb);
  console.log("In make Queues", queues);
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

const imageQueues = async (userID, file, name, dateScheduled) => {
  return new Promise(async (resolve, reject) => {
    let path =  `${name}_${getCurrentDate()?.current}`
    const {minutes, hours, day, month,year} = getCurrentDate();
    if(parseInt(dateScheduled?.minutes) > minutes+1 || parseInt(dateScheduled?.hours) > hours || dateScheduled?.day > day || dateScheduled?.month > month
    || dateScheduled?.year > year){
      // Schedule job
      const date = new Date(dateScheduled?.year, dateScheduled?.month-1, dateScheduled?.day, parseInt(dateScheduled?.hours), parseInt(dateScheduled?.minutes));
      schedule.scheduleJob(date, function(){
        console.log('Schedules file succeessfully');
        queues[userID].add({file: file, name: path, userID: userID})
      });
      await uploadUserImageDb(userID, path, false, "Scheduled", "", file)
    }else{
      
      queues[userID].add({file: file, name: path, userID: userID})
      await uploadUserImageDb(userID, path, false, "In Queue", "", file)
    }
    
    resolve(true);
  })
 
  
}

const timeOut = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    },5000)
  })
}
//makeQueue();
console.log("Commenting out make queue to test");

module.exports = { imageQueues: imageQueues, makeQueue: makeQueue }