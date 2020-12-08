import { gql } from '@apollo/client'
import client from '../client'
import type { IPayloadCategory, IResponseApi } from '../types'

export const adminGetListCategory: (props: {
  authen: string
  skip: number
  limit?: number
  search?: Array<any>
  sort?: Array<{ name: string; desc: boolean }>
}) => Promise<IResponseApi<IPayloadCategory[]>> = async (props) => {
  try {
    const queryString = gql`
      query category($skip: Int, $limit: Int, $search: [Search], $sort: [SortProduct]) {
        admin_get_category_list(
          query: { skip: $skip, limit: $limit, search: $search, sort: $sort }
        ) {
          data {
            id
            name
            description
            create_by
            product_count
            status
          }
          paging {
            count
            current_page
          }
        }
      }
    `
    const { limit, skip, authen, sort, search } = props
    const result = await client.query<{
      admin_get_category_list: {
        data: IPayloadCategory[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, sort, search },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })

    return {
      success: true,
      data: result.data?.admin_get_category_list?.data ?? [],
      count: result?.data?.admin_get_category_list?.paging?.count ?? 0,
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

export const adminAddCategory: (
  props: IPayloadCategory & { authen: string }
) => Promise<IResponseApi<IPayloadCategory>> = async (props) => {}

export const adminActiveCategory: (props: {
  authen: string
  id: string | number
  type: 'active' | 'inactive'
}) => Promise<IResponseApi<IPayloadCategory>> = async (props) => {}

export const adminDeleteCategory: (props: {
  id: string | number
  authen: string
}) => Promise<IResponseApi<IPayloadCategory>> = async (props) => {}
