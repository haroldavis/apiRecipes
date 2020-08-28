const { tasks, users } = require('../constans')

module.exports = {
  Query: {   
    users: () => users,
    user: (_, { id }) => users.find(user => user._id === id)
  },
  Mutation: {
    
  },
  User: {
    tasks: ({_id}) => tasks.filter(task => task.userId === _id)
  }
}