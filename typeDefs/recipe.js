const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    recipes(skip: Int, limit: Int): [Recipe!]
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