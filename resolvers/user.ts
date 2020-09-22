const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { combineResolvers } from 'graphql-resolvers'
const User = require('../database/entity/user')
const Recipe = require('../database/entity/recipe')
const { isAuthenticated } = require('./middleware')


module.exports={
  Query: {
    user: combineResolvers( isAuthenticated, async (_, __, { email }) => {
      try {
        const user = await User.findOne({ email })
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
    signup: async (_: any, { input } : any) => {
      try{
        const user = await User.findOne({ email: input.email })
        if(user){
          throw new Error('Email already in use')
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();

        return result
      }catch(error){
        console.log(error)
        throw error
      }
    },
    login: async (_: any, { input }: any) => {
      try { 
        const user = await User.findOne({ email: input.email })
        if(!user){
          throw new Error('user noy found')
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password)
        if(!isPasswordValid){
          throw new Error('password incorrect')
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' })

        return { token }

      } catch (error) {
        console.log('error')
        throw error
      }
    },    
  },
  User: {
    recipes:  async ({ _id }: any) => {
      try {
        const recipes = await Recipe.find({ user: _id }) 
        return recipes
      } catch (error) {
        console.log('error')
        throw error
      }
    }
  }
}