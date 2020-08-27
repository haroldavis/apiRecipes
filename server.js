const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

dotEnv.config()

const app = express()

app.use(cors())

app.use(express.json())

const typeDefs = gql`
  type Query {
    greetings: [String!]
    name: String
  }
`
const resolvers = {
  Query: {
    greetings : () => ['hi', 'hello'],
    name: () => 'harold'
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

apolloServer.applyMiddleware({app, path: '/graphql' })

const PORT = process.env.PORT || 3000

app.use('/', (req, res, next) => {
  res.send({message: 'whatss upp'});
})



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`)
})