module.exports={
  Query: {
    users: () => users
  },
  Mutations: {

  },
  User: {
    recipes: ({_id}) => users.filter(recipe => recipe._id === _id)
  }
}