import { AuthenticationError, ValidationError } from 'apollo-server-express'
import { model } from 'mongoose'
import { getJwtToken } from '../../commons'
import { roles } from '../../constants'
import { UserSchema, userType } from '../../database/Schemas'
import table from '../../database/tableName'

const UserModel = model<userType>(table.user, UserSchema)

const mutation = {
  /**
   * func đăng ký cho user
   * @param _
   * @param param1
   */
  register(_, { user: { email, password, role = roles.user } }) {
    return UserModel.findOne({ email }).then(user => {
      if (user) throw new ValidationError('This email is not valid!')
      const newUser = new UserModel({
        email,
        password,
        role,
      })
      return newUser.generate().then(() => {
        return newUser.save().then(res => {
          const token = getJwtToken({
            id: res.getId(),
            email: res.getEmail(),
          })
          return {
            ...res.getJson(),
            token,
          }
        })
      })
    })
  },

  /**
   * func login vào hệ thông
   * @param _
   * @param param1
   */
  login(_, { user: { email, password, role = roles.user } }) {
    return UserModel.findOne({ email, role }).then(user => {
      if (!user) throw new ValidationError('This email is not found!')
      return user.compare(password).then(r => {
        if (r) {
          return {
            ...user.getJson(),
            token: getJwtToken({ id: user.getId(), email: user.getEmail() }),
          }
        }

        throw new AuthenticationError('Email or password is wrong!')
      })
    })
  },
}

export default mutation
