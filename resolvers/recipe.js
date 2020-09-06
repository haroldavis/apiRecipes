const { combineResolvers } = require('graphql-resolvers')
const Recipe = require('../database/models/recipe')
const User = require('../database/models/user')
const { isAuthenticated, isRecipeOwner } = require('./middleware')

module.exports={
  Query: {
    recipes: combineResolvers( isAuthenticated, async (_, {cursor, limit=10  }, { loggedInUserId }) => {
      try {
        const query = { user: loggedInUserId }
        if(cursor){
          query['_id'] = {
            '$lt' : cursor
          }
        }
        let recipes = await Recipe.find(query).sort({ _id: -1 }).limit(limit + 1)
        const hasNextPage = recipes.length > limit
        recipes = hasNextPage ? recipes.slice(0, -1) : recipes
        return {
          recipeFeed: recipes,
          pageInfo: {
            nextPageCursor : hasNextPage ? recipes[recipes.length - 1].id : null,
            hasNextPage
          }
        }
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