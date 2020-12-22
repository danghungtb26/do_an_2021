import { Container } from '@material-ui/core'
import React from 'react'
import Banner from './Components/Banner'
import Care from './Components/Care'
import New from './Components/New'

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <Container style={{ minHeight: '80vh' }}>
      <Banner />
      <Care />
      <New />
    </Container>
  )
}

export default Home
