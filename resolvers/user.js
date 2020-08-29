const bcrypt = require('bcryptjs')
const { tasks, users } = require('../constans')
const User = require('../database/models/user')

module.exports = {
  Query: {   
    users: () => users,
    user: (_, { id }) => users.find(user => user._id === id)
  },
  Mutation: {
   signup : async(_, { input }) => {
     try{
      const user = await User.findOne({ email: input.email })
      if( user ){
        throw new Error('Email already in use');
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser = new User({ ...input, password: hashedPassword})
      const result = await newUser.save()
      
      return result
      
     }catch(error){
       console.error()
     }
   }
  },
  User: {
    tasks: ({_id}) => tasks.filter(task => task.userId === _id)
  }
}