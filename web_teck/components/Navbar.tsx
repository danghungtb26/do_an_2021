import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { AUTHEN_TOKEN_WEB_TECK, roles } from '../constants'

const TestA: React.FC<{ setShowPopup: (a: boolean) => void }> = ({ setShowPopup }) => {
  const userRef = React.createRef<any>()
  const handleClickOutside = (event: any) => {
    if (userRef.current && !userRef?.current?.contains(event.target)) {
      setShowPopup(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onSignOut = () => {
    document.cookie = `${AUTHEN_TOKEN_WEB_TECK}=;`
    Router.reload()
  }

  const onRedirectToUser = () => {
    Router.push('/me')
  }

  const onRedirectToProduct = () => {
    Router.push('/me/product')
  }

  return (
    <div ref={userRef} className="view-popup-user">
      <div tabIndex={-1} onClick={onRedirectToUser} aria-hidden className="txt-popup-user">
        Thông tin cá nhân
      </div>
      <div className="line-popup" />
      <div tabIndex={-1} onClick={onRedirectToProduct} aria-hidden className="txt-popup-user">
        Danh sách sản phẩm
      </div>
      <div className="line-popup" />
      <div tabIndex={-1} onClick={onSignOut} aria-hidden>
        <div className="txt-popup-user">Đăng xuất</div>
      </div>
    </div>
  )
}

const Navbar = (props) => {
  const [showPopup, setShowPopup] = React.useState(false)
  const { user } = props || {}

  const toggleUserPopup = () => {
    setShowPopup(!showPopup)
  }

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

                        {/* <li>
                          <Link href="/catalog">Dự Án Tiềm Năng</Link>
                        </li> */}

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
                  //
                  <div style={{ position: 'relative' }}>
                    <div
                      tabIndex={-1}
                      aria-hidden
                      onClick={toggleUserPopup}
                      className="view-user-nav-bar">
                      <div style={{ width: 40, height: 40, borderRadius: 60 }}>
                        <img
                          style={{ width: 40, height: 40, borderRadius: 60 }}
                          src="/images/user_profile.png"
                          alt=""
                        />
                      </div>
                      <div className="three-dot">{`${user?.name ?? ''}`}</div>
                    </div>
                    {showPopup ? <TestA setShowPopup={setShowPopup} /> : null}
                  </div>
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
