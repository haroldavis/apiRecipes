const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { combineResolvers } = require('graphql-resolvers')
const { tasks, users } = require('../constans')
const User = require('../database/models/user')
const Task = require('../database/models/task')
const { isAuthenticated } = require('./middleware')

module.exports = {
  Query: {   
    users: combineResolvers(isAuthenticated, async (_, __, { email }) =>{
        try {
          const user = await User.findOne({email})
          if(!user){
            throw new Error('user not found')
          }
          return user

        } catch (error) {
          console.log(error)
          throw error
        }
       
        
    }) 
  },
  Mutation: {
    signup : async (_, { input }) => {
      try{
        const user = await User.findOne({ email: input.email })
        if (user){
          throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const newUser = new User({ ...input, password: hashedPassword})
        const result = await newUser.save()
        
        return result
        
      }catch(error){
        console.error()
        throw error
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email })
        if(!user){
          throw new Error('User not found')
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password)
        if(!isPasswordValid){
          throw new Error('password incorrect')
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' })

        return { token }
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  User: {
    tasks: async ({ _id }) => {
      try {
        const tasks = await Task.findOne({ user: _id})
        return tasks
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}