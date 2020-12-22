import React from 'react'
import Logo from './Logo'
import RightHeader from './RightHeader'

interface IProps {}

/**
 * component hien thi header cua web o man hinh PC
 */
const Header: React.FC<IProps> = () => {
  return (
    <div className="header__container">
      <Logo />
      <RightHeader />
    </div>
  )
}

export default Header
