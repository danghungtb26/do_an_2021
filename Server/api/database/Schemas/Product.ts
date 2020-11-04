import { Schema, SchemaTypes, Document } from 'mongoose'
import moment from 'moment'
import { product_status_list } from '../../constants'
import table from '../tableName'
import { config_default_collection } from './utils'
import { userType } from './User'

export type productInfoType = {
  id: string
  title: string
  keyword: string
  description: string
  sort_description: string
  react_count: number
  comment_count: number
  view_count: number
  status: number
  created_at: string
  updated_at: string
}

const method = {
  getJson: function getJson(): productInfoType {
    return {
      id: this._id,
      title: this.title,
      keyword: this.keyword,
      sort_description: this.sort_description,
      description: this.description,
      react_count: this.react_count,
      comment_count: this.comment_count,
      view_count: this.view_count,
      status: this.status,
      created_at: moment(this.created_at).format(),
      updated_at: moment(this.updated_at).format(),
    }
  },
  getAuthor: function getAuthor(): string | userType {
    return this.author
  },
  getOwner: function getOwner(): string | userType {
    return this.owner
  },
}

const Product = new Schema<typeof method>(
  {
    title: {
      type: SchemaTypes.String,
      required: true,
    },
    keyword: {
      type: SchemaTypes.String,
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
      enum: product_status_list,
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
    article_count: {
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
    view_count: {
      type: SchemaTypes.Number,
      default: 0,
      min: 0,
    },
  },
  {
    ...config_default_collection,
  }
)

Product.method(method)

export type productType = Document & typeof method & { author: string | userType }

export default Product
