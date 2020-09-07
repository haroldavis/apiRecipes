const mongoose = require('mongoose')

module.exports.connection = async () => {
  try{
    mongoose.set('debug', true)
    await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database connected sucessfully')
  }catch(error){
    console.log(error)
    throw error
  }  
}

module.exports.isValidadObjectId = (_id) => {
  return mongoose.Types.ObjectId.isValid(_id)
}