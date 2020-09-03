const { combineResolvers } = require('graphql-resolvers')
const { tasks, users } = require('../constans')
const Task = require('../database/models/task')
const User = require('../database/models/user')
const { isAuthenticated, isTaskOwner } = require('./middleware')

module.exports = {
  Query: {
    tasks: combineResolvers(isAuthenticated, async (_, __, { loggerInUserId } ) => {
      try {
        const tasks = await Task.find({ user: loggerInUserId })
        return tasks
      } catch (error) {
        console.log(error)
        throw error
      }
    }),    
    task: combineResolvers(isAuthenticated, isTaskOwner, async (_, { _id } ) => {
      try {
        const task = await Task.findById(_id)
        return task
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  },
  Mutation: {
    createTask: combineResolvers(isAuthenticated, async (_, { input }, { email } ) => {
      try {
        const user = await User.findOne({ email })
        const task = new Task({...input, user: user._id})
        const result = await task.save()
        user.tasks.push(result._id)
        await user.save()
        return result
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  },
  Task: {
    user: async ( parent ) =>{
      try {
        const user = await User.findById(parent.user)
        return user
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }  
}