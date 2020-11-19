import { Schema, SchemaTypes } from 'mongoose'
import table from '../tableName'
import { config_default_collection } from './utils'

const method = {}

const React = new Schema<typeof method>(
  {
    product: {
      type: SchemaTypes.ObjectId,
      ref: table.product,
    },
    comment: {
      type: SchemaTypes.ObjectId,
      ref: table.comment,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    react_type: {
      type: SchemaTypes.ObjectId,
      ref: table.reactType,
    },
  },
  {
    ...config_default_collection,
  }
)

React.method(method)

export default React
