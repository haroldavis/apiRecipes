const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    categories: [Category!]
  }

  input createCategorInput{
    name: String
  }

  extend type Mutations{
    createCategory(input: createCategorInput): Category
  }
  
  type Category{
    _id: ID!
    name: String
  }
`