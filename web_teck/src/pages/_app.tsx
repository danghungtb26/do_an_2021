import React from 'react'
import { ApolloProvider } from '@apollo/client'

import '../styles/css/combined.min.css'
import '../styles/css/contact.css'
import '../styles/css/real.css'
import '../styles/css/style.css'
import '../styles/css/styles.css'
import '../styles/css/tab_info.css'
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css'
import '../styles/css/font-awesome.min.css'
import '../styles/css/vista.css'
import '../styles/css/owl.carousel.css'
import '../styles/css/owl.theme.css'
import '../styles/css/owl.transitions.css'
import '../styles/css/main2.css'
import '../styles/css/util.css'
import '../styles/admin/css/styles.css'
import '../styles/me/css/styles.css'
import client from 'src/api/client'
import { AUTHEN_TOKEN_WEB_TECK } from '../constants'
// import '../styles/admin/css/patternfly-additions.css'
// import '../styles/admin/css/zocial.css'
// import '../styles/admin/css/login.css'

// @ts-ignore
function MyApp({ Component, pageProps }) {
  // @ts-ignore
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp

MyApp.getServerSideProps = async ({ req, res }) => {
  const authen = await localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
  return {
    authen,
  }
}
