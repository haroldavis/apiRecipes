const { GraphQLDateTime } = require('graphql-iso-date')
const userResolver = require('./user')
const recipeResolver = require('./recipe')
const categoryResolver = require('./category')

const customDateScalarResolvers = {
  Date: GraphQLDateTime
}

module.exports = [
  userResolver,
  recipeResolver,
  categoryResolver,
  customDateScalarResolvers
]