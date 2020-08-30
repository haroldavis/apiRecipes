const Recipe = require('../database/models/recipe')

module.exports={
  Query: {
    recipes: () => recipes
  },
  Mutation: {
    createRecipe: async (_, { input }) => {
      try {
        const recipe = await Recipe.findOne({ name: input.name })
        if(recipe){
          throw new Error('Recipe already in Recipe')
        }
        const newRecipe = new Recipe({ ...input})
        const result = await newRecipe.save()
        console.log(result)
        return result
      } catch (error) {
        console.log('error')
        throw error
      }
    }
  },
  Recipe: {
    categories : ({_id}) => recipes.filter(recipe => recipe._id === _id)
  }
}