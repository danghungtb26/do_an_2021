import { ValidationError } from 'apollo-server-express'
import { model } from 'mongoose'
import { getUser } from '../../commons'
import { UserSchema, userType } from '../../database/Schemas'
import table from '../../database/tableName'

const UserModel = model<userType>(table.user, UserSchema)

const UserQuery = {
  get_user_info: (_, _a, { auth }) => {
    return getUser(auth).then(({ id }) => {
      return UserModel.findById(id).then(user => {
        if (!user) throw new ValidationError('User not found!')
        return user.getJson()
      })
    })
  },
}

export default UserQuery
