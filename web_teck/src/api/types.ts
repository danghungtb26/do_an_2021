export interface IResponseApi<T> {
  success: boolean
  message?: string
  code?: string
  data?: T | T[]
  page?: {
    current: number
    max: number
  }
  skip?: number
  limit?: number
  count?: number
}

export interface IPayloadBase {
  id?: string | number
  updated_at?: string
  created_at?: string
  status?: string | number
}

export interface IPayloadUser {
  id?: string | number
  token?: string
  name?: string
  avatar?: string
  email?: string
  phone?: string
  role?: string
  introduction?: string
  product_count?: number
  article_count?: string
  updated_at?: string
  created_at?: string
  status?: string | number
}

export interface IPayloadProduct {
  id?: string
  title?: string
  keyword?: string
  sort_description?: string
  description?: string
  status?: number
  owner?: string | IPayloadUser
  author?: string | IPayloadUser
  react_count?: number
  comment_count?: number
  view_count?: number
  updated_at?: string
  created_at?: string
}

export interface IPayloadCategory extends IPayloadBase {
  name?: string
  description?: string
  product_count?: string | number
}
