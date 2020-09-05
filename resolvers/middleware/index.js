const { skip } = require('graphql-resolvers')
const Recipe = require('../../database/models/recipe')
const Category = require('../../database/models/category')
const { isValidadObjectId } = require('../../database/util');


module.exports.isAuthenticated = (_, __, { email }) => {
  if(!email){
    throw new Error('Acces deniend, please login to continue')
  }
  return skip
};

// there is a problem with loggerdInUserId because for to list a recipe by Id
module.exports.isRecipeOwner = async (_, { _id }, { loggedInUserId } ) => {
  try {
    if(!isValidadObjectId(_id)){
      throw new Error('invalid Recipe Id')
    }
    const recipe = await Recipe.findById(_id)

    if (!recipe){
      throw new Error('recipe not found')
    } else if ( recipe.user.toString() != loggedInUserId ){
      console.log(recipe)
      console.log(recipe.user)      
      console.log(loggedInUserId)      
      throw new Error('Not Authorized as recipe owner')
    }
    return skip

  } catch (error) {
    console.log(error)
    throw error
  }
};

module.exports.isCategoryOwner = async (_, { _id }, { loggedInUserId } ) => {
  try {
    if(!isValidadObjectId(_id)){
      throw new Error('invalid Category Id')
    }
    const category = await Category.findById(_id)

    if (!category){
      throw new Error('category not found')
    } else if ( category.user.toString() != loggedInUserId ){
      console.log(category)
      console.log(category.user)      
      console.log(loggedInUserId)      
      throw new Error('Not Authorized as category owner')
    }
    return skip

  } catch (error) {
    console.log(error)
    throw error
  }
}