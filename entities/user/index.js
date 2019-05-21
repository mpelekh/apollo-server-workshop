const { gql } = require('apollo-server-koa')
const UserDataSource = require('./datasource')

module.exports.UserDataSource = UserDataSource

module.exports.typeDefs = gql`
  extend type Query {
    user(userId: Int!): User
    users: [User]
  }

  type User {
    id: Int!
    name: String
    username: String
    email: String
    phone: String
    website: String
  }
`

module.exports.resolvers = {
  Query: {
    user: (root, args, ctx) => ctx.dataSources.user.getUser(args.userId),
    users: (root, args, ctx) => ctx.dataSources.user.getUsers()
  }
}
