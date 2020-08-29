const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    recipes: [Recipe!]
  }

  input createRecipeInput{
    name: String
    description: String!
    ingredients: String!
    category: String!
  }
  
  extend type Mutation{
    createRecipe(input: createRecipeInput!): Recipe
  }
  
  type Recipe{
    _id: ID!
    name: String!
    description: String!
    ingredients: String!
    category: String!
  }
`