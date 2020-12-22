import { UserSchema, userType, productType, ProductSchema } from '../Schemas'
import table from '../tableName'

import mongoose from '../index'

const UserModel = mongoose.model<userType>(table.user, UserSchema)
const ProductModel = mongoose.model<productType>(table.product, ProductSchema)

export default {
  UserModel,
  ProductModel,
}
