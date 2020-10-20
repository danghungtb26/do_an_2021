const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: String!
    name: String
    email: String!
    introduction: String
    phone: String
    role: Int!
    updated_at: String
    created_at: String
    token: String!
  }

  input RegisterUserInput {
    email: String!
    password: String!
    confirm_password: String!
  }

  input loginUserInput {
    email: String!
    password: String!
  }

  type Query {
    get_user_info: User!
  }

  type Mutation {
    register(user: RegisterUserInput!): User!
    login(user: loginUserInput!): User!
  }
`

export default typeDefs
