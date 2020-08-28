const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query{

},
extend type Mutation{

},
type User{
  _id: ID!
  name: String
  email: String
  
}
`