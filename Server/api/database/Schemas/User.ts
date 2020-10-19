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
  /**
   *
   * @param password
   * @param callback
   * func compare xem user đã đăng nhập đúng hay chưa
   * có 2 cách trả về là callback: (error và success)
   */
  compare: function compare(password: string, callback: (error, value) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (typeof callback === 'function') callback(err, isMatch)
        if (err) {
          reject(err)
        }
        resolve(isMatch)
      })
    })
  },
  /**
   *
   * @param callback
   * func này sử dụng salt để generate ra hash_password lưu vào trong database
   */
  generate: function generate(callback: (error, success) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          if (typeof callback === 'function') callback(err, null)
          reject(err)
        }
        bcrypt.hash(this.password, salt, (err2, hash) => {
          if (typeof callback === 'function') callback(err2, hash)
          if (err2) {
            reject(err2)
          }
          this.password = hash
          resolve(hash)
        })
      })
    })
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
