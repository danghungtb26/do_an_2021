import _ from 'lodash'

export const roles = {
  user: 'user',
  admin: 'admin',
}

export const user_status = {
  normal: 1,
  vip: 2,
  blocked: 3,
  report: 4,
  deleted: 0,
}

export const user_status_list = _.values(user_status)

export const product_status = {
  new: 0,
  pending: 1,
  reject: 2,
  reported: 3,
  blocked: 4,
  deleted: 5,
}

export const product_status_value: Record<number, string> = {
  0: 'new',
  1: 'pending',
  2: 'reject',
  3: 'reported',
  4: 'blocked',
  5: 'deleted',
}

export const product_status_list = _.values(product_status)

export const roles_list = [roles.admin, roles.user]

export const active_type: Record<string, any> = {
  aprove: 'aprove',
  reject: 'reject',
  inactive: 'inactive',
  reactive: 'reactive',
}

export const category_status = {
  1: 'active',
  0: 'inactive',
}
