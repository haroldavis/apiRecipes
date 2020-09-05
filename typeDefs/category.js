const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    categories: [Category!]
    category(_id: ID!): Category
  }

  input createCategoryInput{
    name: String!
  }

  extend type Mutation{
    createCategory(input: createCategoryInput!): Category
  }
  
  type Category{
    _id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }
`