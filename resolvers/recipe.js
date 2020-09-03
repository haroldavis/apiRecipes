const { combineResolvers } = require('graphql-resolvers')
const Recipe = require('../database/models/recipe')
const User = require('../database/models/user')
const { isAuthenticated, isRecipeOwner } = require('./middleware')

module.exports={
  Query: {
    recipes: combineResolvers( isAuthenticated, async (_, __, { loggerdInUserId }) => {
      try {
        const recipes = await Recipe.find({ user: loggerdInUserId })
        return recipes
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    recipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { _id } ) => {
      try {
        const recipe = await Recipe.findById(_id)
        return recipe
      } catch (error) {
        console.log(error)
        throw error
      }
   })
  },
  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async (_, { input }, { email }) => {
      try {
        const user = await User.findOne({ email })
        const recipe = new Recipe({ ...input, user: user._id })
        const result = await recipe.save()
        user.recipes.push(result._id)
        await user.save()
        return result
      } catch (error) {
        console.log('error')
        throw error
      }
    }),
    updateRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { _id, input }) => {
      try {
        const recipe = await Recipe.findByIdAndUpdate(_id, { ...input })
        return recipe
      } catch (error) {
        console.log('error')
        throw error
      }      
    }) 
  },
  Recipe: {
    user: async (parent) => {
      try {
        const user = await User.findById(parent.user)
        return user
      } catch (error) {
        console.log('error')
        throw error
      }
    }
  }
}