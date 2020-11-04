import { getJwtToken } from '../../../commons'
import models from '../../Models'

/**
 * func kết nối với csdl để đăng nhập với user
 * @param param0
 */
export const signInMongo: (param: {
  email: string
  password: string
  role?: string
}) => Promise<any> = ({ email, password, role = 'user' }) => {
  return new Promise((resolve, reject) => {
    models.UserModel.findOne({ email, role }).then((user) => {
      if (!user) reject(new Error('Thông tin đăng nhập không chính xác.'))

      if (!user.compare(password)) throw new Error('Thông tin đăng nhập không chính xác.')

      const token = getJwtToken({ id: user.getId(), email: user.getEmail() })

      resolve({ ...user.getJson(), token })
    })
  })
}

/**
 * func kết nối với csdl để tạo thông tin user
 * @param param0
 */
export const signUpMongo: (param: {
  email: string
  password: string
  confirm_password: string
  role?: string
}) => Promise<any> = ({ email, password, confirm_password, role = 'user' }) => {
  return new Promise((resolve) => {
    if (!email || !password || !confirm_password) throw new Error('Missing parameter')

    if (password !== confirm_password) throw new Error('Confirm password not match password')

    UserModel.findOne({ email, role }).then((user) => {
      if (user) throw new Error('User đã tồn tại.')

      const newUser = new UserModel({ email, role })
      newUser.generate()

      newUser.save().then((r) => {
        const token = getJwtToken({ id: r.getId(), email: r.getEmail() })

        resolve({ ...r.getJson(), token })
      })
    })
  })
}
