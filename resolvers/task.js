const uuid = require('uuid')
const { tasks, users } = require('../constans')

module.exports = {
  Query: {
    tasks: () => {
      console.log(tasks);
      return tasks
    },
    task: (_, {id}) => {
      console.log(typeof id)
      return tasks.find(task => task._id === id)
    }
  },
  Mutation: {
    createTask: (_, { input }) => {
      const task = { ...input, _id: uuid.v4() };
      tasks.push(task);
      return task
    }
  },
  Task: {
    user: ({userId}) =>{
      console.log('userId', userId)
      return users.find(user => user._id === userId)
    }
  }
}