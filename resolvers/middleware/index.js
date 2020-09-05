const { skip } = require('graphql-resolvers')
const Task = require('../../database/models/task')
const { isValidObjectId } = require('../../database/utils')

module.exports.isAuthenticated = (_, __, { email }) => {
  if(!email){
    throw new Error('Acess Denied, please login to continue')
  }
  return skip
}

module.exports.isTaskOwner = async (_, { _id }, { loggedInUserId } ) => {
  try{
    if(!isValidObjectId(_id)){
      throw new Error('invalid task id')
    }
    const task = await Task.findById(_id)
    if(!task){
      throw new Error('task not found')
    } else if( task.user.toString() != loggedInUserId ){
      console.log(task)
      console.log(task.user)
      console.log(loggedInUserId)
      console.log(typeof(task.user))
      console.log(typeof(loggedInUserId))
      throw new Error('Not Authorized as task owner')
    }
    
    return skip

  }catch(error){
    console.log(error)
    throw error
  }
}