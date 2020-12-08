import React from 'react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Home from 'src/features/home'
import { Footer, Navbar } from '../components'
import { getInitialTokenProps } from '../commons'

export default function Home2(props) {
  React.useEffect(() => {
    return () => {
      console.log('unmout')
    }
  })
  return (
    <>
      <Navbar {...props} />
      <Home />

      <Footer />
    </>
  )
}

Home2.getInitialProps = async (ctx: any) => {
  const { token, user } = await getInitialTokenProps(ctx)
  console.log('user', user)
  console.log('Home.getInitialProps -> cookies2', token)

  // console.log('object')

  return { authen: token, user }
}
