import { gql } from '@apollo/client'
import client from './client'
import type { IPayloadProduct, IPayloadUser, IResponseApi } from './types'

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

export const getProductListOfUser: (props: {
  authen?: string
  id?: string | number
  skip?: number
  limit?: number
  keyword?: string
}) => Promise<IResponseApi<IPayloadProduct[]>> = async ({
  authen,
  id,
  skip = 0,
  limit = 10,
  keyword,
}) => {
  try {
    const queryString = gql`
      query getProductList(
        $limit: Int
        $skip: Int
        $sort: [SortProduct]
        $user: String
        $keyword: String
      ) {
        get_user_product_list(
          query: { skip: $skip, limit: $limit, sort: $sort, user: $user, keyword: $keyword }
        ) {
          data {
            id
            title
            sort_description
            keyword
            react_count
            comment_count
            view_count
            created_at
          }
          paging {
            count
          }
        }
      }
    `
    const result = await client.query<{
      get_user_product_list: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { user: id, limit, skip, keyword, sort: [{ name: 'created_at', desc: true }] },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })
    return {
      success: true,
      data: result.data?.get_user_product_list?.data ?? [],
      count: result?.data?.get_user_product_list?.paging?.count ?? 0,
      skip,
      limit,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

export const queryStringUser = `
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
}`
