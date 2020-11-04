import { hostApi } from '../database/config'
import { UserQueries } from './queries'
import { UserResolvers, ProductResolvers } from './resolvers'
import typeDefs from './typedefs'

const { ApolloServer, gql, PubSub } = require('apollo-server-express')

// const pubsub = new PubSub()

const ADD_DDD = 'ADD_DDD'

// const typeDefs = gql`
//   type Subscription {
//     postAdded: Hello
//   }

//   type Hello {
//     a: String
//   }

//   type Query {
//     hello(a: String): Hello
//   }

//   type Mutation {
//     add_hello: String
//     hello(a: String): Hello
//   }
// `

const resolvers = {
  // Subscription: {
  //   postAdded: {
  //     subscribe: () => pubsub.asyncIterator([ADD_DDD]),
  //   },
  // },
  Query: {
    ...UserQueries,
  },
  Mutation: {
    ...UserResolvers,
    ...ProductResolvers,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  context: ({ req }) => {
    console.log('req', req)
    const auth = req.headers.authorization || ''
    return {
      auth,
    }
  },
})

const setupGraphql = app => {
  server.applyMiddleware({ app })
  console.log(`🚀 Server ready at http://localhost:${hostApi}${server.graphqlPath}`)
}

const setuphttp = httpServer => {
  server.installSubscriptionHandlers(httpServer)
  console.log(`🚀🥵 Server ready at ws://localhost:${hostApi}${server.subscriptionsPath}`)
}

export { setupGraphql, setuphttp, server }
