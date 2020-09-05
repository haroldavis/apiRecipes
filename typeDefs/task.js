const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    tasks: [Task!]
    task(_id: ID!): Task   
  }

  input createTaskInput{
    name: String!
    completed: Boolean!    
  }

  input updateTaskInput{
    name: String!
    completed: Boolean!
  }
  extend type Mutation{
    createTask(input: createTaskInput!): Task
    updateTask(_id: ID!, input: updateTaskInput!): Task
    deleteTask(_id: ID!): Task
  }

  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`