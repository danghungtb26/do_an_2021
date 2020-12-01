import { gql } from '@apollo/client'
import client from './client'
import type { IPayloadCategory, IResponseApi } from './types'

export const getCategoryList: () => Promise<IResponseApi<IPayloadCategory>> = async () => {
  try {
    const queryString = gql`
      query getCategoryList {
        get_category_list {
          data {
            id
            name
            product_count
          }
        }
      }
    `
    const result = await client.query<{
      get_category_list: {
        data: IPayloadCategory[]
      }
    }>({
      query: queryString,
    })
    return {
      success: true,
      data: result.data?.get_category_list?.data ?? [],
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

export const category_text = ''
