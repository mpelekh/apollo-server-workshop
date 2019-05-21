const { gql } = require('apollo-server-koa')
const PostDataSource = require('./datasource')

module.exports.PostDataSource = PostDataSource

module.exports.typeDefs = gql`
  extend type Query {
    post(postId: Int!): Post
    posts(limit: Int): [Post]
  }

  type Post {
    id: Int!
    userId: Int!
    title: String
    body: String
  }
`

module.exports.resolvers = {
  Query: {
    post: (root, args, ctx) => ctx.dataSources.post.getPost(args.postId),
    posts: (root, args, ctx) => ctx.dataSources.post.getPosts(args.limit)
  }
}
