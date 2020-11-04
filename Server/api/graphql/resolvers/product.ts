import { ValidationError } from 'apollo-server-express'
import { getUser, getUserById, runWithSession } from '../../commons'
import { roles } from '../../constants'
import { ProductModel, UserModel } from '../../database/Models'
import { userType } from '../../database/Schemas'

const addProduct = async (product, auth) => {
  const user = await getUser(auth).then(r => {
    return getUserById(`${r.id}`)
  })

  if (!user || user.getRole() !== roles.user) throw new ValidationError('User not found!')

  return new Promise(resolve => {
    // chạy cùng session để tạo transection
    const { title, description, keyword, sort_description } = product
    const newProduct = new ProductModel({
      title,
      description,
      keyword,
      sort_description,
      author: user.getId(),
      owner: user.getId(),
    })

    runWithSession((session, success) => {
      ProductModel.insertMany([newProduct], { session }).then(products => {
        if (products?.length < 1) throw new ValidationError('Đã có lỗi xảy ra!')
        UserModel.findByIdAndUpdate(
          user.getId(),
          {
            $inc: {
              product_count: 1,
            },
          },
          { session, new: true }
        ).then(() => {
          success().then(async () => {
            resolve({
              ...products[0]?.getJson(),
              author: await getUserById(products[0]?.getAuthor() as string),
              owner: await getUserById(products[0]?.getOwner() as string),
            })
          })
        })
      })
    })
  })
}

const mutation = {
  /**
   * func api để thêm sản phẩm vào database
   * @param _
   * @param param1
   */
  addProduct(_, { product }, { auth }) {
    return addProduct(product, auth)
  },

  /**
   * func api để edit sản phẩm vào database theo id
   * @param _
   * @param param1
   */
  editProduct(_, { product }, { auth }) {
    console.log('editProduct -> auth', auth)
    console.log(product)
  },

  /**
   * func xoá sản phẩm
   * @param _
   * @param param1
   */
  deleteProduct(_, { id }, { auth }) {
    console.log('editProduct -> auth', auth)
    console.log(id)
  },

  update_view_product: (_, { id }) => {
    return ProductModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          view_count: 1,
        },
      },
      {
        new: true,
      }
    )
      .populate('author')
      .populate('owner')
      .then(r => ({
        ...r.getJson(),
        author: (r.getAuthor() as userType).getJson(),
        owner: (r.getOwner() as userType).getJson(),
      }))
  },
}

export default mutation
