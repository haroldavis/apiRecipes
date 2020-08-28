const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    users: [User!]
  }

  input createUserInput{
    name: String!
    email: String!
  }

  extend type Mutation{
    createUser(input: createUser!): User
  }

  type User{
    _id: ID!
    name: String!
    email: String!
    recipes: [Recipe!]
  }
`