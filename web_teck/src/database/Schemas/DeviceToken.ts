import { Schema, SchemaTypes } from 'mongoose'
import table from '../tableName'
import { config_default_collection } from './utils'

const method = {
  getId: function get(): string | number {
    return this._id
  },
  getBody: function get(): string {
    return this.body
  },
}

const DeviceToken = new Schema<typeof method>(
  {
    body: {
      type: SchemaTypes.String,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
      required: true,
    },
  },
  {
    ...config_default_collection,
  }
)

DeviceToken.method(method)

export default DeviceToken
