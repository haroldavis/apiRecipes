const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user')
const recipeTypeDefs = require('./recipe')
const categoryTypeDefs = require('./category')


const typeDefs = gql`
  type Query{
    _:String
  }
  type Mutation{
    _:String
  }
`
module.exports = [
  typeDefs,
  userTypeDefs,
  recipeTypeDefs,
  categoryTypeDefs
]