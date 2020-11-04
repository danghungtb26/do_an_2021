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
    react_count: Int
    comment_count: Int
    view_count: Int
    updated_at: String
    created_at: String
  }

  type Page {
    count: Int
    current_page: Int
    total_page: Int
  }

  type ProductList {
    data: [Product]!
    paging: Page!
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

  input SortProduct {
    name: String
    desc: Boolean
  }

  input QueryProductInput {
    limit: Int
    skip: Int
    keyword: String
    sort: [SortProduct]
  }

  type Query {
    get_user_info: User!
    get_product_list(query: QueryProductInput): ProductList
    get_product_by_id(id: String): Product
  }

  type Mutation {
    register(user: RegisterUserInput!): User!
    login(user: LoginUserInput!): User!
    addProduct(product: AddProductInput!): Product
    editProduct(product: AddProductInput!): Product!
    deleteProduct(id: String!): String
    update_view_product(id: String): Product
  }
`

export default typeDefs
