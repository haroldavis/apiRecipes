const userResolver = require('./user')
const userResolvers = require('./user')
const taskResolvers = require('./task')

module.exports = [
  userResolvers,
  taskResolvers
]