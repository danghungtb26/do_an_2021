import { gql } from '@apollo/client'
import client from './client'
import type { IPayloadProduct, IResponseApi } from './types'

/**
 * func lấy ra danh sách product
 * @param {
 *  authen
 *  limit: số lượng mỗi lần gọi api
 *  skip: vị trí lấy ra data
 *  sort: [] mảng sắp xếp
 *  ketword
 * }
 *
 * @returns IResponseApi<IPayloadProduct>
 */
export const getProductList: (props: {
  authen?: string
  limit?: number
  skip?: number
  sort?: Array<{ name: string; desc: boolean }>
  keyword?: string
}) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {
  try {
    const queryString = gql`
      query getProductList($limit: Int, $skip: Int, $sort: [SortProduct], $keyword: String) {
        get_product_list(query: { skip: $skip, limit: $limit, sort: $sort, keyword: $keyword }) {
          data {
            id
            title
            description
            sort_description
            keyword
            react_count
            comment_count
            view_count
            owner {
              id
              name
            }
            created_at
          }
          paging {
            count
          }
        }
      }
    `
    const { limit, skip, keyword, sort } = props
    const result = await client.query<{
      get_product_list: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, keyword, sort },
    })

    return {
      success: true,
      data: result.data?.get_product_list?.data ?? [],
      count: result?.data?.get_product_list?.paging?.count ?? 0,
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

/**
 * func lấy ra tiết sản phẩm
 * @param props
 * @returns IPayloadProduct
 */
export const getProductDetail: (props: {
  authen: string
  id: string
}) => Promise<IResponseApi<IPayloadProduct>> = async (props) => {
  try {
    const queryString = gql`
      query get_product_detail($id: String) {
        get_product_by_id(id: $id) {
          id
          title
          keyword
          sort_description
          description
          react_count
          comment_count
          view_count
          owner {
            id
            introduction
            phone
            email
          }
        }
      }
    `
    const { id } = props
    const result = await client.query<{ get_product_by_id: IPayloadProduct }>({
      query: queryString,
      variables: {
        id,
      },
    })
    return {
      success: true,
      data: result.data.get_product_by_id,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

/**
 * func call api tăng số lượng xem của sản phẩm lên
 * @param id
 */
export const updateView: (id: string) => Promise<IResponseApi<IPayloadProduct>> = async (id) => {
  try {
    const queryString = gql`
      mutation updateProductView($id: String) {
        update_view_product(id: $id) {
          id
        }
      }
    `
    const result = await client.query<{ get_product_by_id: IPayloadProduct }>({
      query: queryString,
      variables: {
        id,
      },
    })
    return {
      success: true,
      data: result.data.get_product_by_id,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

/**
 * func call api để request tạo product
 */
export const addProduct: (props: {
  authen: string
  title: string
  keyword: string
  sort_description: string
  description: string
}) => Promise<IResponseApi<IPayloadProduct>> = async ({
  authen,
  title,
  keyword,
  sort_description,
  description,
}) => {
  try {
    const queryString = gql`
      mutation addProduct(
        $title: String!
        $keyword: String
        $sort_description: String!
        $description: String!
      ) {
        addProduct(
          product: {
            title: $title
            keyword: $keyword
            sort_description: $sort_description
            description: $description
          }
        ) {
          id
          title
          description
          sort_description
          keyword
          author {
            id
            name
          }
          owner {
            id
            name
          }
        }
      }
    `
    const result = await client.mutate<{ addProduct: IPayloadProduct }>({
      mutation: queryString,
      variables: {
        title,
        keyword,
        sort_description,
        description,
      },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })
    return {
      success: true,
      data: result.data?.addProduct,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}
