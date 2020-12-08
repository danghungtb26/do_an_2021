import { Grid } from '@material-ui/core'
import type { GetServerSideProps } from 'next'
import React, { useCallback } from 'react'
import { getInitialTokenAdminProps } from 'src/commons'
import { SidebarAdmin } from 'src/components'
import AdminUserList from 'src/features/admin/user'

interface IProps {}

const pages: React.FC<IProps> = () => {
  const renderSidebar = useCallback<() => React.ReactNode>(() => {
    return <SidebarAdmin />
  }, [])
  return (
    <Grid container>
      {renderSidebar()}
      <AdminUserList />
    </Grid>
  )
}

export default pages

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { token } = await getInitialTokenAdminProps(context)

  if (!token) {
    if (context.res) {
      context.res.writeHead(302, { Location: '/admin/login' })
      context.res.end()
    }
    // Router.replace('/admin/login')
    // }
  }

  return {
    props: {
      token,
    },
  }
}
