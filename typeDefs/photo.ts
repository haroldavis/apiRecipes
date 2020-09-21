import { gql } from 'apollo-server-express';

module.exports = gql`
  extend type Query{
   photo: [Photo!]
    
  }

  input createCategoryInput{
    name: String!
  }

  input updateCategoryInput{
    name: String!
  }

  extend type Mutation{
    createPhoto(input: createCategoryInput!): Category
    
  }
  
  type Photo{
    id: ID!
    name: String!
    description: String!
    createdAt: Date!
    updatedAt: Date!
  }
`