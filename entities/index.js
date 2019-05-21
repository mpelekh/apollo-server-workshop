const merge = require('lodash/merge')
const { gql } = require('apollo-server-koa')
const Post = require('./post')

const Query = gql`
  type Query {
    _empty: String
  }
`

const typeDefs = [Query, Post.typeDefs]

const resolvers = merge({}, Post.resolvers)

module.exports.typeDefs = typeDefs
module.exports.resolvers = resolvers
