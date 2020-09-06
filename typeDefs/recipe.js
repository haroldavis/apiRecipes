const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    recipes(cursor: String, limit: Int): RecipeFeed!
    recipe(_id: ID!): Recipe
  }

  input createRecipeInput{
    name: String
    description: String!
    ingredients: String!    
  }
  
  input updateRecipeInput{
    name: String!
  }

  extend type Mutation{
    createRecipe(input: createRecipeInput!): Recipe
    updateRecipe(_id: ID!, input: updateRecipeInput): Recipe
    deleteRecipe(_id: ID!): Recipe
  }
  
  type RecipeFeed{
    recipeFeed: [Recipe!]
    pageInfo: PageInfo
  }

  type PageInfo{
    nextPageCursor: String
    hasNextPage: Boolean
  }

  type Recipe{
    _id: ID!
    name: String!
    description: String!
    ingredients: String!
    user: User!
    category: Category
    createdAt: Date!
    updatedAt: Date!
  }
` 