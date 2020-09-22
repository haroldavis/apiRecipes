import { combineResolvers } from 'graphql-resolvers'
const Category = require('../database/entity/category')
const User = require('../database/entity/user')
const { isAuthenticated, isCategoryOwner } = require('./middleware')

module.exports={
  Query: {
    categories: combineResolvers(isAuthenticated, async (_, __, { loggedInUserId  }) => {
      try {
        const categories = await Category.find({ user: loggedInUserId })
        console.log(categories)
        return categories
      } catch (error) {
        console.log(error)
        throw error
      }      
    }),
    category: combineResolvers(isAuthenticated, isCategoryOwner, async(_, { _id }) => {
      try {
        const category = await Category.findById(_id)
        return category 
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  },
  Mutation: {
    createCategory: combineResolvers(isAuthenticated, async (_, { input }, { email }) => {
      try {
        const user = await User.findOne({ email })
        const category = new Category({ ...input , user: user._id })
        const result = await category.save()
        user.categories.push(result._id)
        await user.save()
        return result
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    updateCategory: combineResolvers(isAuthenticated, isCategoryOwner, async(_, { _id, input }) => {
      try {
        const category = await Category.findByIdAndUpdate(_id, { ...input }, {new: true})
        return category
      } catch (error) {
        console.log('error')
        throw error
      }
    }),
    deleteCategory: combineResolvers(isAuthenticated, isCategoryOwner, async(_, { _id }, { loggedInUserId }) => {
      try {
        const category = await Category.findByIdAndDelete(_id)
        await Category.updateOne({ _id: loggedInUserId }, { $pull: { categories: category._id } })
        return category
      } catch (error) {
        console.log('error')
        throw error
      }
    })
  },
  Category: {
    user: async (parent: any) => {
      try {
        const user = await User.findById(parent.user)
        return user
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}