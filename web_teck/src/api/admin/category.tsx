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
  props: IPayloadCategory & { authen: string; title: string }
) => Promise<IResponseApi<IPayloadCategory>> = async (props) => {
  const ss = gql`
    mutation($title: String, $description: String, $id: String, $status: Int) {
      admin_add_category(
        param: { title: $title, description: $description, id: $id, status: $status }
      ) {
        id
        name
        description
        create_by
        product_count
        status
      }
    }
  `
  try {
    const { id, title, description, status, authen } = props

    const result = await client.mutate<{
      admin_add_category: {
        data: IPayloadCategory
      }
    }>({
      mutation: ss,
      variables: { id, title, description, status },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })

    return {
      success: true,
      data: result.data?.admin_add_category ?? {},
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

export const adminEditCategory: (props: {
  authen: string
  id: string | number
  title: string
  description: string
  status: number
}) => Promise<IResponseApi<IPayloadCategory>> = async (props) => {
  const ss = gql`
    mutation($title: String, $description: String, $id: String, $status: Int) {
      admin_edit_category(
        param: { title: $title, description: $description, id: $id, status: $status }
      ) {
        id
        name
        description
        create_by
        product_count
        status
      }
    }
  `
  try {
    const { id, title, description, status, authen } = props
    console.log(
      '🚀 ~ file: category.tsx ~ line 85 ~ )=>Promise<IResponseApi<IPayloadCategory>>= ~ description',
      description
    )
    const result = await client.mutate<{
      admin_edit_category: {
        data: IPayloadCategory
      }
    }>({
      mutation: ss,
      variables: { id, title, description, status },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })

    return {
      success: true,
      data: result.data?.admin_edit_category ?? {},
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

export const adminDeleteCategory: (props: {
  id: string | number
  authen: string
}) => Promise<IResponseApi<IPayloadCategory>> = async (props) => {}

export const adminGetListContact: (props: {
  authen: string
  skip: number
  limit?: number
}) => Promise<IResponseApi<any>> = async (props) => {
  const ss = gql`
    query($skip: Int, $limit: Int) {
      admin_get_contact_list(query: { skip: $skip, limit: $limit }) {
        data {
          id
          info
          from_user {
            id
            name
          }
          to_user {
            id
            name
          }
        }
        paging {
          count
        }
      }
    }
  `
  try {
    const { limit, skip, authen } = props
    const result = await client.query<{
      admin_get_contact_list: {
        data: any
        paging: {
          count?: number
        }
      }
    }>({
      query: ss,
      variables: { limit, skip },
      context: {
        headers: {
          authorization: `Bearer ${authen}`,
        },
      },
    })

    return {
      success: true,
      data: result.data?.admin_get_contact_list?.data ?? [],
      count: result?.data?.admin_get_contact_list?.paging?.count ?? 0,
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
