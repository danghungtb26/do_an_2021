import { model } from 'mongoose'
import { ProductSchema, productType, UserSchema, userType } from '../Schemas'
import table from '../tableName'

export const ProductModel = model<productType>(table.product, ProductSchema)
export const UserModel = model<userType>(table.user, UserSchema)
