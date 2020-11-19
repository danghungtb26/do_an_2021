import { Schema, SchemaTypes } from 'mongoose'
import { config_default_collection } from './utils'

const method = {
  getId: function get(): string | number {
    return this._id
  },
  getName: function get(): string {
    return this.name
  },
  getKey: function get(): string {
    return this.keyword
  },
}

const Language = new Schema<typeof method>(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    keyword: {
      type: SchemaTypes.String,
      required: true,
    },
    description: SchemaTypes.String,
  },
  {
    ...config_default_collection,
  }
)

Language.method(method)

export default Language
