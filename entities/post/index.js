const { gql } = require('apollo-server-koa')
const PostDataSource = require('./datasource')

module.exports.PostDataSource = PostDataSource

module.exports.typeDefs = gql`
  extend type Query {
    Post(postId: Int): Post
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
    Post: (root, args, ctx) => ctx.dataSources.post.getPost(args.postId)
  }
}
