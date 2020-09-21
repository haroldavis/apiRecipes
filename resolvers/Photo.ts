const { combineResolvers } = require('graphql-resolvers')
const Photo = require('../database/entity/Photo')

module.exports={
    Query : {
        photo : () => {
            return Photo
        }
    },
    Mutation : {
        let photo = new Photo()
        photo.name = "Me and Bears"
        photo.description = "I am near polar bears"
    }
}