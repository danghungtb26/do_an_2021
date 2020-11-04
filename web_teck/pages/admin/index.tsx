import React from 'react'
import Router, { useRouter } from 'next/router'

console.log('Router', Router)

const AdminPage = () => {
  //   const route = useRouter()
  //   React.useEffect(() => {
  //     route.push('/admin/sign-in')
  //   }, [])
  return <p>aaaaa</p>
}

export default AdminPage

AdminPage.getInitialProps = async ({ req, res }) => {
  //   window.location.href('/admin/sign-in')
  return {}
}
