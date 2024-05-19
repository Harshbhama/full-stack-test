const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const checkForUserWithEmailDb = async (email) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = prisma.user.findFirst({
        where: {
          email: email
        }
      })
      resolve(user);
    }catch(err){
      console.log(err)
      reject(false)
    }
  })
}

const createUserDb = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = await prisma.user.create({
        data:{
          email: email,
          password: password
        } 
      })
      resolve(user);
    }catch(error){
      reject(error);
    }
  })
}


module.exports = { checkForUserWithEmailDb: checkForUserWithEmailDb, createUserDb: createUserDb }
