import mongoose from 'mongoose'
import table from '../tableName'

const { SchemaTypes, Schema } = mongoose

const method = {
  getId: function getId(): number | string {
    return this._id
  },
  getName: function getName(): string {
    return this.name
  },
  getNumberOfProduct: function get(): number {
    return this.number_of_product
  },
}

const Category = new Schema<typeof method>(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    description: SchemaTypes.String,
    number_of_product: SchemaTypes.Number,
    parent_category: {
      type: SchemaTypes.ObjectId,
      ref: table.category,
    },
    create_by: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    status: {
      type: SchemaTypes.ObjectId,
      enum: [0, 1, 2, 3],
      default: 1,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'created_at',
    },
    autoIndex: true,
  }
)

Category.method(method)

export default Category
