module.exports={
  Query: {
    recipes: () => recipes
  },
  Mutations: {

  },
  Recipe: {
    categories : ({_id}) => categories.filter(category => category._id === _id)
  }
}