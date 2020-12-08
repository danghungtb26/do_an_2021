import { gql } from '@apollo/client'
import client from './client'

export const test_upload = ''

export const uploadImage = async (file) => {
  try {
    const queryString = gql`
      mutation a($file: Upload!) {
        upload_file(file: $file) {
          filename
          id
        }
      }
    `
    const result = await client.mutate({
      mutation: queryString,
      variables: {
        file,
      },
    })
    return {
      success: true,
      data: result.data.upload_file,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message ?? error?.response?.message ?? '',
    }
  }
}
