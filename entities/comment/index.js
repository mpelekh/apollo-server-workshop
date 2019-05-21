const { gql } = require('apollo-server-koa')
const CommentDataSource = require('./datasource')

module.exports.CommentDataSource = CommentDataSource

module.exports.typeDefs = gql`
  extend type Query {
    comments(postId: Int): [Comment]
  }

  type Comment {
    id: Int!
    postId: Int!
    name: String
    email: String
    body: String
  }
`

module.exports.resolvers = {
  Query: {
    comments: (root, args, ctx) =>
      ctx.dataSources.comment.getComments(args.postId)
  }
}
