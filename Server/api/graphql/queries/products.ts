import { ValidationError } from 'apollo-server-express'
import { getSort } from '../../commons'
import { ProductModel } from '../../database/Models'
import { userType } from '../../database/Schemas'

const ProductQuery = {
  get_product_list: async (_, { query: { skip, limit, sort, keyword } }, { auth }) => {
    console.log('keyword', keyword)
    console.log('keyword', auth)
    return ProductModel.find()
      .populate('author')
      .populate('owner')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort(getSort(sort ?? []))
      .then(async r => {
        return {
          data: r.map(e => {
            return {
              ...e.getJson(),
              author: (e.getAuthor() as userType).getJson(),
              owner: (e.getOwner() as userType).getJson(),
            }
          }),
          paging: {
            count: await ProductModel.countDocuments(),
          },
        }
      })
  },

  get_product_by_id: (_, { id }, { auth }) => {
    console.log('auth', auth)
    if (typeof id === 'undefined') {
      throw new ValidationError('Id not found!')
    }

    return ProductModel.findById(id)
      .populate('author')
      .populate('owner')
      .then(r => ({
        ...r.getJson(),
        author: (r.getAuthor() as userType).getJson(),
        owner: (r.getOwner() as userType).getJson(),
      }))
  },
}

export default ProductQuery
