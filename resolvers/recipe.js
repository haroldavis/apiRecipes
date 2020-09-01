const { combineResolvers } = require('graphql-resolvers')
const Recipe = require('../database/models/recipe')
const User = require('../database/models/user')
const { isAuthenticated } = require('./middleware')

module.exports={
  Query: {
    recipes: () => recipes
  },
  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async (_, { input }, { email }) => {
      try {
        const user = await User.findOne({ email })
        const recipe = new Recipe({ ...input, user: user.email })
        const result = await recipe.save()
        user.recipes.push(result._id)
        await user.save()
        return result
      } catch (error) {
        console.log('error')
        throw error
      }
    }) 
  },
  Recipe: {
    user: ({  }) => {
      
    }
  }
}