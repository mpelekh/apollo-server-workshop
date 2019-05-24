const { gql } = require('apollo-server-koa')
const CommentDataSource = require('./datasource')

module.exports.CommentDataSource = CommentDataSource

module.exports.typeDefs = gql`
  extend type Query {
    comments(postId: Int): [Comment]
  }
  
  extend type Mutation {
    addComment(postId: Int!, comment: InputComment!): Comment
  }

  type Comment {
    id: Int!
    postId: Int!
    name: String
    email: String
    body: String
  }
  
  input InputComment {
    name: String
    email: String
    body: String
  }
`

module.exports.resolvers = {
  Query: {
    comments: (root, args, ctx) =>
      ctx.dataSources.comment.getComments(args.postId)
  },
  Mutation: {
    addComment: (root, args, ctx) =>
      ctx.dataSources.comment.addComment(args.postId, args.comment)
  }
}
