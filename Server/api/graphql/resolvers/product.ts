import { ValidationError } from 'apollo-server-express'
import { getUser, getUserById, runWithSession } from '../../commons'
import { roles } from '../../constants'
import { ProductModel, UserModel } from '../../database/Models'

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
              author: await getUserById(products[0]?.getAuthor()),
              owner: await getUserById(products[0]?.getOwner()),
            })
          })
        })
      })
    })
  })
}

const mutation = {
  /**
   * func api để thêm sản phẩm vào database
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
  editProduct(_, { product }, { auth }) {},

  /**
   * func xoá sản phẩm
   * @param _
   * @param param1
   */
  deleteProduct(_, { id }, { auth }) {},
}

export default mutation
