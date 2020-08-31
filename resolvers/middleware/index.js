const { skip } = require('graphql-resolvers')

module.exports.isAuthenticated = (_, __, { email }) => {
  if(!email){
    throw new Error('Acess Denied, please login to continue')
  }
  return skip
}