const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query{
    user: User
  }

  extend type Mutation{
    signup(input: signupInput!): User
    login(input: loginInput!): Token
  }
  
  input signupInput{
    name: String!
    email: String!
    password: String!
  }  

  input loginInput{
    email: String!
    password: String!
  }

  type Token{
    token: String!
  }

  type User{
    _id: ID!
    name: String!
    email: String!
    recipes: [Recipe!]  
    categories: [Category!]
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Subscription{
    userCreated: User
  }
`