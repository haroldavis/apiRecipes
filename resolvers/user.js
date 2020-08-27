const { tasks, users } = require('../constans')

module.exports = {
  Query: {   
    users: () => users,
    user: (_, {id}) => users.find(user => user._id === id)
  },
  Mutation: {
    
  },
  Task: {
    user: ({userId}) =>{
      console.log('userId', userId)
      return users.find(user => user._id === userId)
    }
  },
  User: {
    task: ({_id}) => tasks.filter(task => task._id === _id)
  }
}