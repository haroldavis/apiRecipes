const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query{

},
type Category{
  _id: ID!
  name: String
}
`