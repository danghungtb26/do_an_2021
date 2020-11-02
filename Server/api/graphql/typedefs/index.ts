const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: String!
    name: String
    email: String!
    introduction: String
    phone: String
    role: String
    updated_at: String
    created_at: String
    token: String!
  }

  type Product {
    id: String!
    title: String!
    keyword: String
    sort_description: String
    description: String!
    status: Int!
    owner: User
    author: User
    react_count: Int!
    comment_count: Int!
  }

  input RegisterUserInput {
    email: String!
    password: String!
    confirm_password: String!
    role: String
  }

  input LoginUserInput {
    email: String!
    password: String!
    role: String
  }

  input AddProductInput {
    id: String
    title: String
    keyword: String
    sort_description: String
    description: String
  }

  type Query {
    get_user_info: User!
  }

  type Mutation {
    register(user: RegisterUserInput!): User!
    login(user: LoginUserInput!): User!
    addProduct(product: AddProductInput!): Product
    editProduct(product: AddProductInput!): Product!
    deleteProduct(id: String!): String
  }
`

export default typeDefs
