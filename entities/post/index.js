const { gql } = require('apollo-server-koa')
const PostDataSource = require('./datasource')
const pubsub = require('../../pubsub')

module.exports.PostDataSource = PostDataSource

module.exports.typeDefs = gql`
  extend type Query {
    post(postId: ID!): Post
    posts(limit: Int): [Post]
  }

  extend type Mutation {
      addCommentToPost(postId: ID!, comment: InputComment!): Post
  }

  type Post {
    id: ID!
    user: User
    title: String
    body: String
    comments: [Comment]
  }
`

module.exports.resolvers = {
  Query: {
    post: (root, args, ctx) => ctx.dataSources.post.getPost(args.postId),
    posts: (root, args, ctx) => ctx.dataSources.post.getPosts(args.limit)
  },
  Mutation: {
    addCommentToPost: async (root, args, ctx) => {
      const comment = await ctx.dataSources.comment.addComment(
        args.postId,
        args.comment
      )

      await pubsub.publish('commentAdded', { commentAdded: comment })

      const postComments = await ctx.dataSources.comment.getComments(args.postId)

      return { comments: [...postComments, comment], id: args.postId }
    }
  },
  Post: {
    user: (root, args, ctx) => {
      const { userId } = root
      return ctx.dataSources.user.getUser(userId)
    },
    comments: (root, args, ctx) => {
      const { id: postId } = root
      return root.comments || ctx.dataSources.comment.getComments(postId)
    }
  }
}
