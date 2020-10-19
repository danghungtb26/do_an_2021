import { Schema, SchemaTypes } from 'mongoose'
import table from '../tableName'
import { config_default_collection } from './utils'

const method = {}

const Product = new Schema<typeof method>(
  {
    title: {
      type: SchemaTypes.String,
      required: true,
    },
    sort_description: {
      type: SchemaTypes.String,
    },
    description: {
      type: SchemaTypes.String,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: table.category,
    },
    status: {
      type: SchemaTypes.Number,
      enum: [0, 1, 2, 3],
      default: 2,
    },
    react_count: {
      type: SchemaTypes.Number,
      default: 0,
      min: 0,
    },
    comment_count: {
      type: SchemaTypes.Number,
      default: 0,
      min: 0,
    },
    attachment: {
      type: SchemaTypes.Array,
    },
    banner: {
      type: SchemaTypes.ObjectId,
      ref: table.attachment,
    },
    admin: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
  },
  {
    ...config_default_collection,
  }
)

Product.method(method)

export default Product
