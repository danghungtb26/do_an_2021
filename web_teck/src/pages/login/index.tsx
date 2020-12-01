import { CircularProgress, Grid } from '@material-ui/core'

import React from 'react'
import Router from 'next/router'
import { signIn, signUp } from 'src/api/auth'
import type { IPayloadUser } from 'src/api/types'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'
// import { signUpMongo } from '../../database/Controllers'

const Login = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    is_sign_up: false,
  })

  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')

  React.useEffect(() => {
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    if (authen) Router.push('/')
  }, [])

  const toggle_sign = () => {
    setState((s) => ({ ...s, is_sign_up: !s.is_sign_up, confirm_password: '', password: '' }))
  }

  const onChangeText = (event) => {
    const { value, name } = event.target
    switch (name) {
      case 'email': {
        setState((s) => ({ ...s, email: value }))
        break
      }

      case 'password': {
        setState((s) => ({ ...s, password: value }))
        setError('')
        break
      }

      case 'confirm_password': {
        setState((s) => ({ ...s, confirm_password: value }))
        setError('')
        break
      }

      default:
        break
    }
  }

  const onSubmit = () => {
    if (!state.is_sign_up) {
      setLoading(true)
      signIn({ email: state.email, password: state.password }).then((r) => {
        if (r.success) {
          document.cookie = `${AUTHEN_TOKEN_WEB_TECK}=${(r.data as IPayloadUser).token}`
          localStorage.setItem(AUTHEN_TOKEN_WEB_TECK, `${(r.data as IPayloadUser).token || ''}`)
          Router.replace('/', undefined, { shallow: true })
        } else {
          setLoading(false)
          setError('Xảy ra lỗi! Vui lòng thử lại.')
        }
      })
    } else {
      if (state.password !== state.confirm_password) {
        setError('Mật khẩu không khớp')
      }
      signUp({
        email: state.email,
        password: state.password,
        confirm_password: state.confirm_password,
      }).then((r) => {
        if (r.success) {
          document.cookie = `${AUTHEN_TOKEN_WEB_TECK}=${(r.data as IPayloadUser).token}`
          localStorage.setItem(AUTHEN_TOKEN_WEB_TECK, `${(r.data as IPayloadUser).token || ''}`)
          Router.replace('/', undefined, { shallow: true })
        } else {
          setLoading(false)
          setError('Xảy ra lỗi! Vui lòng thử lại.')
        }
      })
    }
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          {/* <form className="login100-form validate-form"> */}
          <span className="login100-form-title p-b-26">Welcome</span>
          <span className="login100-form-title p-b-48">
            <i className="zmdi zmdi-font" />
          </span>
          <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
            <input
              className="input100"
              type="text"
              name="email"
              value={state.email}
              onChange={onChangeText}
            />
            <span className="focus-input100" data-placeholder="Email" />
          </div>
          <div className="wrap-input100 validate-input" data-validate="Enter password">
            <span className="btn-show-pass">
              <i className="zmdi zmdi-eye" />
            </span>
            <input
              className="input100"
              type="password"
              value={state.password}
              name="password"
              onChange={onChangeText}
            />
            <span className="focus-input100" data-placeholder="Mật khẩu" />
          </div>
          {!state.is_sign_up ? null : (
            <div className="wrap-input100 validate-input" data-validate="Enter confirm password">
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye" />
              </span>
              <input
                className="input100"
                type="password"
                value={state.confirm_password}
                name="confirm_password"
                onChange={onChangeText}
              />
              <span
                className="focus-input100"
                data-placeholder="Xác nhận mật khẩu"
                onChange={onChangeText}
              />
            </div>
          )}
          <Grid container alignItems="center" style={{ width: '100%' }}>
            <div style={{ fontSize: 12, color: 'red' }}>{error}</div>
          </Grid>
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn" />
              <button onClick={onSubmit} type="submit" className="login100-form-btn">
                {loading ? (
                  <CircularProgress size={24} style={{ marginRight: 12, color: '#fff' }} />
                ) : null}{' '}
                Đăng nhập
              </button>
            </div>
          </div>

          <Grid
            container
            className="text-center p-t-115"
            alignItems="center"
            style={{ width: '100%' }}>
            <span className="txt1">Chưa có tài khoản? </span>
            <div onClick={toggle_sign} tabIndex={-1} aria-hidden className="sign-in-new">
              Đăng ký ngay
            </div>
          </Grid>
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default Login
