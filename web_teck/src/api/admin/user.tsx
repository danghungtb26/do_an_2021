import type { IPayloadUser, IResponseApi } from '../types'

export const adminGetListUser: (props: {
  authen: string
  keyword: string
  skip: number
  limit?: number
}) => Promise<IResponseApi<IPayloadUser>> = async () => {}

// export const adminAddUser: (
//   props: IPayloadUser & { authen: string }
// ) => Promise<IResponseApi<IPayloadUser>> = async (props) => {}

export const adminBlockUser: (props: {
  authen: string
  id: string | number
  type: 'block' | 'unblock'
}) => Promise<IResponseApi<IPayloadUser>> = async (props) => {}

export const adminDeleteUser: (props: {
  id: string | number
  authen: string
}) => Promise<IResponseApi<IPayloadUser>> = async (props) => {}
