import { gql } from '@apollo/client'
import client from '../client'
import type { IPayloadProduct, IResponseApi } from '../types'

const responseProduct = `{
  id
  title
  description
  high_light
  sort_description
  keyword
  category {
    id
    name
  }
  react_count
  comment_count
  view_count
  status
  owner {
    id
    name
  }
  created_at
}`

export const adminGetListProduct: (props: {
  authen: string
  keyword: string
  skip: number
  sort?: Array<{ name: string; desc: boolean }>
  limit?: number
}) => Promise<IResponseApi<IPayloadProduct[]>> = async (props) => {
  try {
    const queryString = gql`
      query getProductList($limit: Int, $skip: Int, $sort: [SortProduct], $keyword: String) {
        admin_get_product_list(
          query: { skip: $skip, limit: $limit, sort: $sort, keyword: $keyword }
        ) {
          data ${responseProduct}
          paging {
            count
          }
        }
      }
    `
    const { limit, skip, keyword, sort, authen } = props
    const result = await client.query<{
      admin_get_product_list: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, keyword, sort },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })

    return {
      success: true,
      data: result.data?.admin_get_product_list?.data ?? [],
      count: result?.data?.admin_get_product_list?.paging?.count ?? 0,
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

// export const adminAddProduct: (
//   props: IPayloadProduct & { authen: string }
// ) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {}

export const adminActiveProduct: (props: {
  authen: string
  id: string | number
  type: 'active' | 'inactive'
}) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {
  try {
    const queryString = gql`
      mutation aprove($id: String, $type: String) {
        admin_active_product(param: { id: $id, type: $type }) ${responseProduct}
      }
    `
    const { authen, ...rest } = props
    const result = await client.mutate<{ admin_active_product: IPayloadProduct }>({
      mutation: queryString,
      variables: {
        ...rest,
      },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })
    return {
      success: true,
      data: result.data?.admin_active_product,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

export const adminDeleteProduct: (props: {
  id: string | number
  authen: string
}) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {}

export const adminAproveProduct: (props: {
  id: string | number
  authen: string
  type: 'aprove' | 'reject'
  category?: string
}) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {
  try {
    const queryString = gql`
      mutation aprove($id: String, $type: String, $category: String) {
        admin_aprove_product(param: { id: $id, type: $type, category: $category }) ${responseProduct}
      }
    `
    const { authen, ...rest } = props
    const result = await client.mutate<{ admin_aprove_product: IPayloadProduct }>({
      mutation: queryString,
      variables: {
        ...rest,
      },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })
    return {
      success: true,
      data: result.data?.admin_aprove_product,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

export const adminCheckBannerProduct: (props: {
  id: string | number
  authen: string
  high_light: boolean
}) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {
  try {
    const queryString = gql`
      mutation aprove($id: String, $high_light: Boolean) {
        admin_high_light_product(param: { id: $id, high_light: $high_light }) ${responseProduct}
      }
    `
    const { authen, ...rest } = props
    const result = await client.mutate<{ admin_high_light_product: IPayloadProduct }>({
      mutation: queryString,
      variables: {
        ...rest,
      },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })
    return {
      success: true,
      data: result.data?.admin_high_light_product,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}
