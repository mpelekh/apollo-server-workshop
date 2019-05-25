const { gql } = require('apollo-server-koa')
const CommentDataSource = require('./datasource')
const pubsub = require('../../pubsub')

module.exports.CommentDataSource = CommentDataSource

module.exports.typeDefs = gql`
  extend type Query {
    comments(postId: ID): [Comment]
  }

  extend type Mutation {
    addComment(postId: ID!, comment: InputComment!): Comment
  }

  extend type Subscription {
    commentAdded: Comment
  }

  type Comment {
    id: ID!
    postId: ID!
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
    addComment: async (root, args, ctx) => {
      const comment = await ctx.dataSources.comment.addComment(
        args.postId,
        args.comment
      )
      await pubsub.publish('commentAdded', { commentAdded: comment })
      return comment
    }
  },
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator('commentAdded')
    }
  }
}
