/**
 * func sign-in
 */

import { gql } from '@apollo/client'
import client from './client'
import { IPayloadUser, IResponseApi } from './types'

export const signIn: (param: { email; password }) => Promise<IResponseApi<IPayloadUser>> = async ({
  email,
  password,
}) => {
  try {
    const query = gql`
      mutation login($email: String!, $password: String!) {
        login(user: { email: $email, password: $password }) {
          id
          role
          token
          updated_at
          created_at
        }
      }
    `
    const result = await client.mutate<{ login: IPayloadUser }>({
      mutation: query,
      variables: {
        email,
        password,
      },
    })
    return {
      success: true,
      data: result.data.login,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}

/**
 * func call api để đăng ký
 * @param param0
 */
export const signUp: (param: {
  email
  password
  confirm_password
}) => Promise<IResponseApi<IPayloadUser>> = async ({ email, password, confirm_password }) => {
  try {
    const query = gql`
      mutation register($email: String!, $password: String!, $confirm_password: String!) {
        register(
          user: { email: $email, password: $password, confirm_password: $confirm_password }
        ) {
          id
          role
          token
          updated_at
          created_at
        }
      }
    `
    const result = await client.mutate<{ register: IPayloadUser }>({
      mutation: query,
      variables: {
        email,
        password,
        confirm_password,
      },
    })
    return {
      success: true,
      data: result.data.register,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}
