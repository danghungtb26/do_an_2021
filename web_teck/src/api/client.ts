import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

export const baseUrlImage = 'https://do-an-2021.herokuapp.com/image/'
const base_url = 'https://do-an-2021.herokuapp.com/graphql'

// const base_url = 'http://localhost:6161/graphql'
// export const baseUrlImage = 'http://localhost:6161/image/'

const client = new ApolloClient({
  // uri: base_url,
  // @ts-ignore
  link: createUploadLink({
    uri: base_url,
  }),
  cache: new InMemoryCache(),
})

export default client
