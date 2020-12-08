import type { GetServerSideProps } from 'next'
import React from 'react'
import { getInitialTokenAdminProps } from 'src/commons'
import AdminCategoryList from 'src/features/admin/category'
import Router from 'next/router'

interface IProps {}

const CategoryListPages: React.FC<IProps> = (props) => {
  return <AdminCategoryList {...props} />
}

export default CategoryListPages

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { token } = await getInitialTokenAdminProps(context)

  if (!token) {
    if (context.res) {
      context.res.writeHead(302, { Location: '/admin/login' })
      context.res.end()
    } else {
      Router.replace('/admin/login')
    }
  }

  return {
    props: {
      token: token || null,
    },
  }
}
