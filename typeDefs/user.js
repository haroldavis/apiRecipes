const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    users: [User!]
    user(id: ID!): User
  }
  
  input signupInput{
    name: String!
    email: String!
    password: String!
  }

  extend type Mutation{
    signup(input: signupInput!): User
  }

  type User{
    _id: ID!
    name: String!
    email: String!
    recipes: [Recipe!]
  }
`