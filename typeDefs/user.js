const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: User    
  }  

  extend type Mutation{
    signup(input: signupInput): User
    login(input: loginInput): Token
  }

  input loginInput{
    email: String!
    password: String!
  }

  input signupInput{
    name: String!
    email: String!
    password: String!
  }

  type Token{
    token: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    tasks: [Task!]
    createdAt: Date!
    updatedAt: Date!
  }  
`