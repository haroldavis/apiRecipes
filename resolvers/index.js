const { GraphQLDateTime } = require('graphql-iso-date')
const userResolvers = require('./user')
const taskResolvers = require('./task')

const customDateScalarResolvers = {
  Date: GraphQLDateTime
}

module.exports = [
  userResolvers,
  taskResolvers,
  customDateScalarResolvers
]