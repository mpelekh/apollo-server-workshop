const merge = require('lodash/merge')
const { gql } = require('apollo-server-koa')
const Post = require('./post')
const Comment = require('./comment')
const User = require('./user')

const Query = gql`
  type Query {
    _empty: String
  }
`

const typeDefs = [Query, Post.typeDefs, Comment.typeDefs, User.typeDefs]

const resolvers = merge(Post.resolvers, Comment.resolvers, User.resolvers)

module.exports.typeDefs = typeDefs
module.exports.resolvers = resolvers
