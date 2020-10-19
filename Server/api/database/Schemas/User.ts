import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import table from '../tableName'

const { Schema, SchemaTypes } = mongoose

const method = {
  getJson: function getJson(): {
    id: string | number
    name: string
    introduction: string
    email: string
    phone: string
    role: number
  } {
    return {
      id: this.uuid,
      name: this.name,
      introduction: this.introduction,
      email: this.email,
      phone: this.phone,
      role: this.role,
    }
  },
  getId: function getId(): string | number {
    return this._id
  },
  getName: function getName(): string {
    return this.name
  },
  getRole: function getRole(): number {
    return this.role
  },
  isAdmin: function isAdmin(): boolean {
    return true
  },
  getEmail: function getEmail(): string {
    return this.email
  },
  getPhone: function getPhone(): string {
    return this.phone
  },
}

const User = new Schema<typeof method>(
  {
    name: {
      type: SchemaTypes.String,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
    },
    avatar: {
      type: SchemaTypes.String,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    phone: {
      type: SchemaTypes.String,
      default: null,
    },
    introduction: {
      type: SchemaTypes.String,
      default: null,
    },
    role: {
      type: SchemaTypes.ObjectId,
      ref: table.role,
    },
    status: {
      type: SchemaTypes.Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    device_token: {
      type: SchemaTypes.Array,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    autoIndex: true,
  }
)

User.method(method)

export default User
