const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const uploadUserImageDb = async (userId, path, uploaded = false, status = "In Queue", timestamp="", base64="") => {
  return new Promise(async (resolve, reject) => {
    try{
      if(!uploaded){
        await prisma.images.create({
          data:{
            userId: userId,
            path: path,
            status: status,
            timestamp: timestamp,
            base64String: base64
          } 
        })
      }
      else{
        await prisma.$queryRaw`Update images
        Set status = ${status}
        where path = ${path} AND userid = ${userId}`
        console.log("File updated successfully")
      }
     
      
      resolve(true);
    }catch(err){
      console.log(err)
      reject(false)
    }
  })
}

const checkForUsersDb = () => {
  return new Promise(async (resolve, reject) => {
    let result = await prisma.user.findMany();
    resolve(result);
  })
}

const checkImagesForUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try{
      let result = await prisma.images.findMany({
        where: {
          userId: userId
        }
      })
      resolve(result);
    }catch(error){
      reject(error);
    }
  })
}


module.exports = { uploadUserImageDb: uploadUserImageDb, checkForUsersDb:  checkForUsersDb, checkImagesForUser: checkImagesForUser}
