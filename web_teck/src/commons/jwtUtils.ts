import jwt from 'jsonwebtoken'
import { secretkey } from '../database/config'

/**
 * func nay dùng để sinh ra authen_token cho user khi đăng ký hoặc đăng nhập
 * expire 1y
 * @param param0 {
 *  id: string | number
 *  email: string
 * }
 */
export const getJwtToken: (param: { id: string | number; email: string }) => string = ({
  id,
  email,
}) =>
  jwt.sign({ id, email }, secretkey, {
    expiresIn: '365d',
  })

/**
 * func này dựa vào authen cung cấp để lấy ra id của user đăng nhập
 * @param auth: string
 */
export const getUser: (auth: string) => Promise<{ id: string | number }> = (auth) => {
  return new Promise((resolve) => {
    if (!auth) resolve({ id: null })

    const token = auth.split('Bearer ')[1]

    if (!token) resolve({ id: null })

    jwt.verify(token, secretkey, (err, decoded) => {
      if (err) throw new Error('invalid token!')
      resolve({ id: decoded.id })
    })
  })
}
