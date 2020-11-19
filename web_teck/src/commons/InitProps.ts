import { getUserInfo } from 'src/api'
import type { IPayloadUser } from 'src/api/types'
import cookies from 'next-cookies'
import router from 'next/router'
import { AUTHEN_TOKEN_WEB_TECK, roles } from 'src/constants'

// func lấy ra token trong cookie
export const getInitialTokenProps = async (ctx: any) => {
  const cookies2 = cookies(ctx)

  const token = cookies2[AUTHEN_TOKEN_WEB_TECK]

  let dataUser

  if (token) {
    const result = await getUserInfo(token)
    if (result.success) {
      dataUser = result.data as IPayloadUser
    }
  }

  return { token, user: dataUser }
}

export const getInitialTokenPropsAndCheck = async (ctx: any) => {
  const cookies2 = cookies(ctx)

  const token = cookies2[AUTHEN_TOKEN_WEB_TECK]

  let dataUser

  if (!token)
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      router.replace('/login')
    }

  if (token) {
    const result = await getUserInfo(token)
    if (result.success) {
      dataUser = result.data as IPayloadUser
      if (!dataUser.id || dataUser.role !== roles.user)
        if (ctx.res) {
          ctx.res.writeHead(302, { Location: '/login' })
          ctx.res.end()
        } else {
          router.replace('/login')
        }
    }
  }
  console.log('dataUser', dataUser)

  return { token, user: dataUser }
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
