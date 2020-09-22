import { gql } from 'apollo-server-express';

module.exports = gql`
  extend type Query{
    categories: [Category!]
    category(_id: ID!): Category
  }

  input createCategoryInput{
    name: String!
  }

  input updateCategoryInput{
    name: String!
  }

  extend type Mutation{
    createCategory(input: createCategoryInput!): Category
    updateCategory(_id: ID!, input: updateCategoryInput!): Category
    deleteCategory(_id: ID!): Category
  }
  
  type Category{
    _id: ID!
    name: String!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`