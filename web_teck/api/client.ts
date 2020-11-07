import { ApolloClient, InMemoryCache } from '@apollo/client'

const base_url = 'https://do-an-2021.herokuapp.com/graphql'
// const base_url = 'http://localhost:6161/graphql'

const client = new ApolloClient({
  uri: base_url,
  cache: new InMemoryCache(),
})

export default client
