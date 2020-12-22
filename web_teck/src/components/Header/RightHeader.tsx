/* eslint-disable jsx-a11y/anchor-is-valid */
import Popover from '@material-ui/core/Popover'
import React, { useCallback, useState } from 'react'
import { getUserInfo } from 'src/api/user'
import type { IPayloadUser } from 'src/api/types'
import { AUTHEN_TOKEN_WEB_TECK, roles } from 'src/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BaseButtonNotShadow from '../Buttons/BaseButtonNotShadow'

interface IProps {}

/**
 * component hien thi top RightHeader
 * bao gom language va profile
 */
const RightHeader: React.FC<IProps> = () => {
  const [anchorElLanguage, setAnchorElLanguage] = useState(null)
  const [showPopup, setShowPopup] = React.useState(false)
  const [user, setUser] = React.useState<IPayloadUser | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    if (!authen) {
      setLoading(false)
    }
    getUserInfo(`${authen}`).then((r) => {
      if (r.success) {
        setUser(r.data as IPayloadUser)
        setLoading(false)
      } else setLoading(false)
    })
  }, [])

  /** func dong mo popup language */
  const handleClose = useCallback(() => {
    setAnchorElLanguage(null)
  }, [])

  const handleClick = useCallback((event) => {
    setAnchorElLanguage(event.currentTarget)
  }, [])
  /**
   * view hiển thị popup chọn langugage
   */

  const open = Boolean(anchorElLanguage)
  const id = open ? 'simple-popover' : undefined

  const router = useRouter()
  const onSignOut = () => {
    document.cookie = `${AUTHEN_TOKEN_WEB_TECK}=;`
    localStorage.removeItem(AUTHEN_TOKEN_WEB_TECK)
    router.reload()
  }
  /**
   * view hien thi popup cac danh mục của profile
   * nếu chưa đăng nhập thì ko hiển thị
   */
  const renderPopupLanguage = useCallback(() => {
    return (
      <Popover
        id={id}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="popup-popover-header"
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        anchorEl={anchorElLanguage}
        onClose={handleClose}>
        <Link href="/me">
          <div className="div-select-language">Thông tin cá nhân</div>
        </Link>
        <Link href="/me/product">
          <div className="div-select-language">Sản phẩm của tôi</div>
        </Link>
        <div className="div-select-language" onClick={onSignOut}>
          Đăng xuất
        </div>
      </Popover>
    )
  }, [open, id, anchorElLanguage, handleClose, onSignOut])
  /**
   * view hien thi thong tin user neu đã đăng nhập
   * trường hợp chưa đăng nhập sẽ hiển thị btn join
   */
  const renderProfile = useCallback(() => {
    if (loading) return null

    if (!user?.id || user?.role !== roles.user)
      return (
        <div className="div-view-button-join">
          <BaseButtonNotShadow
            onClick={() => {
              router.push('/login')
            }}>
            Đăng nhâp
          </BaseButtonNotShadow>
        </div>
      )
    return (
      <div className="view-user-nav-bar" onClick={handleClick}>
        <div style={{ width: 40, height: 40, borderRadius: 60 }}>
          <img
            style={{ width: 40, height: 40, borderRadius: 60 }}
            src="/images/user_profile.png"
            alt=""
          />
        </div>
        <div className="three-dot">{`${user?.name ?? ''}`}</div>
      </div>
    )
  }, [loading, user, router])

  return (
    <div className="div-header-right">
      {renderProfile()}
      {renderPopupLanguage()}
    </div>
  )
}

export default RightHeader
