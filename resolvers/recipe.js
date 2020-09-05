const { combineResolvers } = require('graphql-resolvers')
const Recipe = require('../database/models/recipe')
const User = require('../database/models/user')
const { isAuthenticated, isRecipeOwner } = require('./middleware')

module.exports={
  Query: {
    recipes: combineResolvers( isAuthenticated, async (_, {skip=0, limit=10  }, { loggedInUserId }) => {
      try {
        const recipes = await Recipe.find({ user: loggedInUserId }).sort({ _id: -1 }).skip(skip).limit(limit)
        return recipes
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    recipe: combineResolvers( isAuthenticated, isRecipeOwner, async (_, { _id }) => {
      try {
        const recipe = await Recipe.findById(_id)
        return recipe
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
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
        const recipe = await Recipe.findByIdAndUpdate(_id, { ...input }, {new: true})
        return recipe
      } catch (error) {
        console.log('error')
        throw error
      }      
    }),
    deleteRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async( _, { _id }, { loggedInUserId }) => {
      try {
        const recipe = await Recipe.findByIdAndDelete(_id)
        await User.updateOne({ _id: loggedInUserId }, { $pull: { recipes: recipe._id } })
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