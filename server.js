const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const Dataloader = require('dataloader')

dotEnv.config()

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const { connection } = require('./database/util')
const { verifyUser } = require('./helper/context/index')
const loaders = require('./loaders')

const app = express()

//db connected
connection()

app.use(cors())

app.use(express.json())


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    await verifyUser(req)
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId,
      loaders: {
        user: new Dataloader(keys => loaders.user.batchUser(keys))
      }
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