const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const resolvers = require('./resolvers')


dotEnv.config()

const app = express()

app.use(cors())

app.use(express.json())

const typeDefs = gql`
  type Query {
    greetings: [String!]
    tasks: [Task!]
    task(id: ID!): Task
    users: [User!]
    user(id: ID!): User
  }

  input createTaskInput{
    name: String!
    completed: Boolean!
    userId: ID!
  }

  type Mutation{
    createTask(input: createTaskInput!): Task
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    task: [Task!]
  }

  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`

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