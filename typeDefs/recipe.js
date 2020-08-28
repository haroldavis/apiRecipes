const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query{

},
extend type Mutation{

},
type Recipe{
  _id: ID!
  name: String
  description: String
  ingredients: String
  category: String
}
`