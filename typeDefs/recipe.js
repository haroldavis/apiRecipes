const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    recipes: [Recipe!]
    recipe(_id: ID!): Recipe
  }

  input createRecipeInput{
    name: String
    description: String!
    ingredients: String!    
  }
  
  extend type Mutation{
    createRecipe(input: createRecipeInput!): Recipe
    updateRecipe(id: ID!, input: updateRecipeInput): Recipe
  }

  input updateRecipeInput{
    name: String!
    description: String!
    ingredients: String!
  }
  
  type Recipe{
    _id: ID!
    name: String!
    description: String!
    ingredients: String!
    user: User!
    categories: Category
  }
` 