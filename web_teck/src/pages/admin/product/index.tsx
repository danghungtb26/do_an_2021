import { Grid } from '@material-ui/core'
import type { GetServerSideProps, NextPage } from 'next'
import Router from 'next/router'
import React, { useCallback } from 'react'
import { getInitialTokenAdminProps } from 'src/commons'
import { SidebarAdmin } from 'src/components'
import AdminProductList from 'src/features/admin/product'

interface IProps {
  token?: string | null
}

const pages: NextPage<IProps> = (props) => {
  const renderSidebar = useCallback<() => React.ReactNode>(() => {
    return <SidebarAdmin {...props} />
  }, [])
  return (
    <Grid container>
      {renderSidebar()}
      <AdminProductList {...props} />
    </Grid>
  )
}

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

export default pages
