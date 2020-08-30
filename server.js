const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

dotEnv.config()

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const { connection } = require('./database/utils')
const { verifyUser } = require('./helper/context')


const app = express()

//db connected
connection()

app.use(cors())

app.use(express.json())

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    verifyUser(req)
    console.log('context ====')
    return {
      email: "test@gmail.com" + Math.random()
    }
    
  }
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