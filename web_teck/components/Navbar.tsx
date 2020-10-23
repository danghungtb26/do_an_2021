import React from 'react'
import Link from 'next/link'

const Navbar = (props) => {
  const { a } = props || {}
  return (
    <header className="header sticky">
      <div className="container">
        <div className="row">
          <div className="header__left col-lg-2 col-md-3 col-sm-4 col-xs-12">
            <a href="#mobile-menu" title="Menu chính" className="hidden-lg btn-menu">
              <span /> <span /> <span />
            </a>
            <div className="logo">
              <a href="/">
                <img src="/images/logo-white.png" className="image-original" alt="Logo" />
                <img src="/images/logo.png" className="image-scroll" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="header__right col-lg-10 col-md-9 col-sm-8 col-xs-12">
            <div className="row">
              <div className="col-lg-10 col-md-4 ">
                <div className="header__right--menu">
                  <div className="menu">
                    <nav className="nav">
                      <ul className="hidden-md hidden-sm hidden-xs">
                        <li>
                          <Link href="/about">Giới thiệu</Link>
                        </li>

                        <li>
                          <a href="/duannew" title="Dự Án">
                            Dự Án
                          </a>
                        </li>

                        <li>
                          <a href="/catalog" title="Dự Án Tiềm Năng">
                            Dự Án Tiềm Năng
                          </a>
                        </li>

                        <li>
                          <a href="/new" title="Tin tức - Sự kiện">
                            Tin tức - Sự kiện
                          </a>
                        </li>

                        <li>
                          <a href="/contact" title="Liên hệ">
                            Liên hệ
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 header__left--menu">
                <div className="account">
                  <a href="#a" className="login" title="Đăng nhập">
                    Đăng nhập
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
