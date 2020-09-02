const { skip } = require('graphql-resolvers')
const Recipe = require('../../database/models/recipe')

module.exports.isAuthenticated = (_, __, { email }) => {
  if(!email){
    throw new Error('Acces deniend, please login to continue')
  }
  return skip
}

module.exports.isRecipeOwner = async(_, { _id }, { loggedInUserId }) => {
  try {
    const recipe = await Recipe.findById(_id)
    if(!recipe){
      throw new Error('recipe not found')
    } else if(recipe.user.toString() !== loggedInUserId ){
      throw new Error('Not authorizated as recipe owner')
    }
    return skip
  } catch (error) {
    console.log(error)
    throw error
  }
 
}