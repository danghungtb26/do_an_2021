import UserQueries from './users'
import ProductQueries from './products'

export { default as UserQueries } from './users'
export { default as ProductQueries } from './products'

const queries = {
  ...UserQueries,
  ...ProductQueries,
}

export default queries
