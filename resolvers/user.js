const User = require('../database/models/user')
const bcrypt = require('bcryptjs')

module.exports={
  Query: {
    users: () => users,
    user: (_, { _id }) => users.find(user => user._id === _id)
  },
  Mutations: {
    signup: async (_, { input }) => {
      try{
        const user = await User.findOne({ email: input.email })
        if(user){
          throw new Error('Email already in use')
        }
        const hashedPassword = await bcrypt.hash(input.password, 10)
        const newUser = new User({...input, password: hashedPassword })
        const result = await newUser.save()

        return result
      }catch(error){
        console.log(error)
        throw error
      }
    }
  },
  User: {
    recipes: ({_id}) => users.filter(recipe => recipe._id === _id)
  }
}