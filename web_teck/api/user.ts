import { gql } from '@apollo/client'
import client from './client'
import type { IPayloadUser, IResponseApi } from './types'

/**
 * api lấy ra thông tin của user
 * yêu cầu cần có authen
 * @param authen
 */
export const getUserInfo: (authen?: string) => Promise<IResponseApi<IPayloadUser>> = async (
  authen
) => {
  try {
    const queryString = gql`
      query getUserInfo {
        get_user_info {
          id
          name
          avatar
          introduction
          email
          phone
          role
          product_count
          article_count
        }
      }
    `
    const result = await client.query<{ get_user_info: IPayloadUser }>({
      query: queryString,
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })
    return {
      success: true,
      data: result?.data?.get_user_info,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

/**
 * api dùng để thay đổi thông tin của user
 * yêu cầu có authen và 1 phân của user
 * @param authen
 */
export const editUserInfo: (
  props: IPayloadUser & { authen: string }
) => Promise<IResponseApi<IPayloadUser>> = (authen) => {}
