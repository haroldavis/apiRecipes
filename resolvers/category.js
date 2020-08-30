const Category = require('../database/models/category')

module.exports={
  Query: {
    categories: () => categories
  },
  Mutation: {
    createCategory: async (_, { input }) => {
      try {
        const category = await Category.findOne({ name: input.name})
        if(category){
          throw new Error('Category already exist')
        }
        const newCategory = new Category({...input})
        const result = await newCategory.save()

        return result
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}