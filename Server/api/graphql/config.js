import { hostApi } from '../database/config'

const { ApolloServer, gql, PubSub } = require('apollo-server-express')

const pubsub = new PubSub()

const ADD_DDD = 'ADD_DDD'

const typeDefs = gql`
  type Subscription {
    postAdded: Hello
  }

  type Hello {
    a: String
  }

  type Query {
    hello(a: String): Hello
  }

  type Mutation {
    add_hello: String
    hello(a: String): Hello
  }
`

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([ADD_DDD]),
    },
  },
  Query: {
    hello: (_, { a }) => {
      console.log('a', a)
      return {
        a: `aaa${a}`,
      }
      // throw Error('aaa')
    },
  },
  Mutation: {
    add_hello: () => 'aaaa',
    hello: (_, { a }) => {
      pubsub.publish(ADD_DDD, { postAdded: { a } })
      console.log('a', a)
      return {
        a: `aaa${a}`,
      }
      // throw Error('aaa')
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers, tracing: true })

const setupGraphql = app => {
  server.applyMiddleware({ app })
  console.log(`🚀 Server ready at http://localhost:${hostApi}${server.graphqlPath}`)
}

const setuphttp = httpServer => {
  server.installSubscriptionHandlers(httpServer)
  console.log(`🚀🥵 Server ready at ws://localhost:${hostApi}${server.subscriptionsPath}`)
}

export { setupGraphql, setuphttp, server }
