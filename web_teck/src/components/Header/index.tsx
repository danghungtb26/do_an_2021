import React from 'react'
import Sticky from 'react-stickynode'
import Header from './Header'

interface IProps {}

const TopBar: React.FC<IProps> = () => {
  return (
    <Sticky innerZ={10000}>
      <Header />
    </Sticky>
  )
}

export default TopBar
