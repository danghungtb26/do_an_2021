import { Schema, SchemaTypes } from 'mongoose'
import table from '../tableName'
import { config_default_collection } from './utils'

const method = {}

const Comment = new Schema<typeof method>(
  {
    product: {
      type: SchemaTypes.ObjectId,
      ref: table.product,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    parent: {
      type: SchemaTypes.ObjectId,
      ref: table.comment,
    },
    reply_count: {
      type: SchemaTypes.Number,
      default: 0,
    },
    react_count: {
      type: SchemaTypes.Number,
      default: 0,
    },
  },
  {
    ...config_default_collection,
  }
)

Comment.method(method)

export default Comment
