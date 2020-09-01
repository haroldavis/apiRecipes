const { skip } = require('graphql-resolvers')

module.exports.isAuthentication = (_, __, { email }) => {
  if(!email){
    throw new Error('Acces deniend, please login to continue')
  }
  return skip
}