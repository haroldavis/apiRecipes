const { combineResolvers } = require('graphql-resolvers')
const { tasks, users } = require('../constans')
const Task = require('../database/models/task')
const User = require('../database/models/user')
const { isAuthenticated } = require('./middleware')

module.exports = {
  Query: {
    tasks: () => {
      console.log(tasks);
      return tasks
    },
    task: (_, {id}) => {
      console.log(typeof id)
      return tasks.find(task => task._id === id)
    },
    
  },
  Mutation: {
    createTask: combineResolvers(isAuthenticated, async (_, { input }, { email } ) => {
      try {
        const user = await User.findOne({ email })
        const task = new Task({...input, user: user.id})
        const result = await task.save()
        user.tasks.push(result.id)
        await user.save()
        return result
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  },
  Task: {
    user: ({ userId }) =>{
      console.log('userId', userId)
      return users.find(user => user._id === userId)
    }
  }  
}