import { Schema, SchemaTypes } from 'mongoose'
import { config_default_collection } from './utils'

const method = {}

const ReactType = new Schema<typeof method>(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    ...config_default_collection,
  }
)

ReactType.method(method)

export default ReactType
