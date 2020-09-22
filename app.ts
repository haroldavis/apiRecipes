import * as express from "express";
import { Response } from "express";
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

dotEnv.config()

import { connect } from './database/index'
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const PORT = process.env.PORT || 3000

const { verifyUser } = require('./helper/context/index')

async function startServer() {
  connect()
  const app = express()

  app.use(cors())

  app.use(express.json())

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
    console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`)
  })
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}: any) => {
      await verifyUser(req)
      console.log('context ran====')
      return {
        email: req.email,
        loggedInUserId: req.loggedInUserId
      }
    }
  })

  apolloServer.applyMiddleware({app, path: '/graphql' })

  app.use('/', ( res: Response) => {
    res.send({message: 'whatss upp'});
})

  return app;
}


startServer()







