module.exports={
  Query: {
    recipes: () => recipes
  },
  Mutation: {

  },
  Recipe: {
    categories : ({_id}) => categories.filter(category => category._id === _id)
  }
}