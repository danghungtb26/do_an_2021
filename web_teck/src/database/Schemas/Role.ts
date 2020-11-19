import mongoose from 'mongoose'

const { Schema, SchemaTypes } = mongoose

/**
 * method sử dụng cho các bản ghi của role
 */
const method = {
  getJson: function getJson(): {
    id: string | number
    name: string
    description: string
  } {
    return {
      id: this.uuid,
      name: this.name,
      description: this.description,
    }
  },
  getId: function getId(): string | number {
    return this._id
  },
  getName: function getName(): string {
    return this.name
  },
  getDescription: function getDescription(): string {
    return this.description
  },
  getCreatedAt: function getCreatedAt(): string {
    return this.created_at
  },
  getUpdatedAt: function getUpdatedAt(): string {
    return this.updated_at
  },
  compareRole: function compareRole(role: string): boolean {
    return this.name === role
  },
  compareRoleId: function compareRoleId(id: string | number): boolean {
    return this.uuid === id
  },
}

const Role = new Schema<typeof method>(
  {
    // uuid: v5(table.role),
    name: {
      type: SchemaTypes.String,
    },
    description: {
      type: SchemaTypes.String,
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

Role.method(method)

export type RoleType = mongoose.Document & typeof method

export default Role
