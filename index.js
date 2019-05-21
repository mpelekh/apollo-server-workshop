const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const { typeDefs, resolvers } = require('./entities')
const { PostDataSource } = require('./entities/post')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    post: new PostDataSource()
  }),
  context: {
    urlPrefix: 'https://jsonplaceholder.typicode.com'
  }
})

const app = new Koa()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)