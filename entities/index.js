const merge = require('lodash/merge')
const { gql } = require('apollo-server-koa')
const Post = require('./post')
const Comment = require('./comment')

const Query = gql`
  type Query {
    _empty: String
  }
`

const typeDefs = [Query, Post.typeDefs, Comment.typeDefs]

const resolvers = merge(Post.resolvers, Comment.resolvers)

module.exports.typeDefs = typeDefs
module.exports.resolvers = resolvers
