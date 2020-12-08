import { gql } from '@apollo/client'
import client from './client'
import type { IPayloadProduct, IResponseApi } from './types'

export const getProductNew: (props: {
  authen?: string
  limit?: number
  skip?: number
  sort?: Array<{ name: string; desc: boolean }>
}) => Promise<IResponseApi<IPayloadProduct[]>> = async (props) => {
  try {
    const queryString = gql`
      query getProductList($limit: Int, $skip: Int, $sort: [SortProduct]) {
        get_product_new(query: { skip: $skip, limit: $limit, sort: $sort }) {
          data {
            id
            title
            description
            sort_description
            keyword
            react_count
            comment_count
            view_count
            attachment
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
    const { limit, skip, sort } = props
    const result = await client.query<{
      get_product_new: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, sort },
    })

    return {
      success: true,
      data: result.data?.get_product_new?.data ?? [],
      count: result?.data?.get_product_new?.paging?.count ?? 0,
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
  category?: string | number
}) => Promise<IResponseApi<IPayloadProduct[]>> = async (props) => {
  try {
    const queryString = gql`
      query getProductList(
        $limit: Int
        $skip: Int
        $sort: [SortProduct]
        $keyword: String
        $category: String
      ) {
        get_product_list(
          query: { skip: $skip, limit: $limit, sort: $sort, keyword: $keyword, category: $category }
        ) {
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
    const { limit, skip, keyword, sort, category } = props
    const result = await client.query<{
      get_product_list: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, keyword, sort, category },
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
          budget
          deployment_time
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
    console.log('🚀 ~ file: product.ts ~ line 191 ~ error', error)

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
  budget: string
  attachment: Array<string>
  deployment_time: string
}) => Promise<IResponseApi<IPayloadProduct>> = async ({
  authen,
  title,
  keyword,
  sort_description,
  description,
  budget,
  attachment,
  deployment_time,
}) => {
  try {
    const queryString = gql`
      mutation addProduct(
        $title: String!
        $keyword: String
        $sort_description: String!
        $description: String!
        $budget: String!
        $deployment_time: String!
        $attachment: [String]
      ) {
        addProduct(
          product: {
            title: $title
            keyword: $keyword
            sort_description: $sort_description
            description: $description
            budget: $budget
            deployment_time: $deployment_time
            attachment: $attachment
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
        budget,
        deployment_time,
        attachment,
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

export const queryProductDetail = `
  get_product_by_id(id: $product_id) {
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
  }`

export const getProductHighLight: (props: {
  authen?: string
  limit?: number
  skip?: number
  sort?: Array<{ name: string; desc: boolean }>
}) => Promise<IResponseApi<IPayloadProduct[]>> = async (props) => {
  try {
    const queryString = gql`
      query getProductList($limit: Int, $skip: Int, $sort: [SortProduct]) {
        get_product_highlight(query: { skip: $skip, limit: $limit, sort: $sort }) {
          data {
            id
            title
            description
            sort_description
            keyword
            react_count
            comment_count
            view_count
            attachment
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
    const { limit, skip, sort } = props
    const result = await client.query<{
      get_product_highlight: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, sort },
    })

    return {
      success: true,
      data: result.data?.get_product_highlight?.data ?? [],
      count: result?.data?.get_product_highlight?.paging?.count ?? 0,
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

export const getProductBanner: (props: {
  authen?: string
  limit?: number
  skip?: number
  sort?: Array<{ name: string; desc: boolean }>
}) => Promise<IResponseApi<IPayloadProduct[]>> = async (props) => {
  try {
    const queryString = gql`
      query getProductList($limit: Int, $skip: Int, $sort: [SortProduct]) {
        get_product_banner(query: { skip: $skip, limit: $limit, sort: $sort }) {
          data {
            id
            title
            description
            sort_description
            keyword
            react_count
            comment_count
            view_count
            attachment
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
    const { limit, skip, sort } = props
    const result = await client.query<{
      get_product_banner: {
        data: IPayloadProduct[]
        paging: {
          count?: number
        }
      }
    }>({
      query: queryString,
      variables: { limit, skip, sort },
    })

    return {
      success: true,
      data: result.data?.get_product_banner?.data ?? [],
      count: result?.data?.get_product_banner?.paging?.count ?? 0,
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
