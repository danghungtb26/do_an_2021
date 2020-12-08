import React from 'react'
import { useRouter } from 'next/router'

const AdminPage = () => {
  const route = useRouter()
  React.useEffect(() => {
    route.push('/admin/login', undefined, { shallow: true })
  }, [])
  return <div />
}

export default AdminPage
