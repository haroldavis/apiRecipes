const { skip } = require('graphql-resolvers')
const Recipe = require('../../database/models/recipe')
const { isValidationObjectId } = require('../../database/util')

module.exports.isAuthenticated = (_, __, { email }) => {
  if(!email){
    throw new Error('Acces deniend, please login to continue')
  }
  return skip
};

module.exports.isRecipeOwner = async (_, { _id }, { loggedInUserId } ) => {
  try {
    if(!isValidationObjectId){
        throw new Error('invalid Recipe Id')
    }
      const recipe = await Recipe.findById(_id)
    if(!recipe){
      throw new Error('user not found')
    }else if( recipe.user.toString() !== loggedInUserId){
      console.log(recipe.user)
      throw new Error('Not Authorized as recipe owner')
    }
    return skip
  } catch (error) {
    console.log(error)
    throw error
  }
}