import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Supplier = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    base: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: table.location,
        },
      ],
      default: [],
    },

    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 1,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: table.category,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: table.location,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

export default Supplier
