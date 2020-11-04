import cookies from 'next-cookies'
import router from 'next/router'
import { AUTHEN_TOKEN_WEB_TECK } from '../constants'

// func lấy ra token trong cookie
export const getInitialTokenProps = async (ctx: any) => {
  const cookies2 = cookies(ctx)

  const token = cookies2[AUTHEN_TOKEN_WEB_TECK]

  return { token }
}

export const checkTokenInInitial = async (ctx: any) => {
  const cookies2 = cookies(ctx)

  const token = cookies2[AUTHEN_TOKEN_WEB_TECK]

  if (!token)
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      router.replace('/login')
    }
  return token
}
