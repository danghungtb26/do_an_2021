import React from 'react'
import Link from 'next/link'
import { roles } from '../constants'

const Navbar = (props) => {
  const { user } = props || {}
  console.log('Navbar -> user', user)
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
                          <Link href="/duannew">Dự Án</Link>
                        </li>

                        <li>
                          <Link href="/catalog">Dự Án Tiềm Năng</Link>
                        </li>

                        <li>
                          <Link href="/new">Tin tức - Sự kiện</Link>
                        </li>

                        <li>
                          <Link href="/contact">Liên hệ</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-2 col-md-12 col-sm-12 col-xs-12 header__left--menu"
                style={{ alignItems: 'center', display: 'flex' }}>
                {!user?.id || user?.role !== roles.user ? (
                  <div className="account">
                    <a href="/login" className="login" title="Đăng nhập">
                      Đăng nhập
                    </a>
                  </div>
                ) : (
                  <Link href="/me">
                    <div className="view-user-nav-bar">
                      <div style={{ width: 40, height: 40, borderRadius: 60 }}>
                        <img
                          style={{ width: 40, height: 40, borderRadius: 60 }}
                          src="/images/user_profile.png"
                          alt=""
                        />
                      </div>
                      <div className="three-dot">{`${user?.name ?? ''}`}</div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
