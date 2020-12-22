import Link from 'next/link'
import React from 'react'

interface IProps {}

/**
 * component hien thi logo cua trang web
 */
const Logo: React.FC<IProps> = () => {
  return (
    <Link href="/product">
      <div className="div-img-logo">
        <img src="/images/logo.png" alt="capichi-logo" className="img-logo" />
      </div>
    </Link>
  )
}

export default Logo
