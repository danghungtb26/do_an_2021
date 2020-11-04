import { Button, Input } from '@material-ui/core'
import cookies from 'next-cookies'
import React from 'react'
import Router from 'next/router'
import { signIn } from '../../api/auth'
import { IPayloadUser } from '../../api/types'
import { AUTHEN_TOKEN_WEB_TECK } from '../../constants'
// import { signUpMongo } from '../../database/Controllers'

const Login = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    is_sign_up: false,
  })

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
        break
      }

      case 'confirm_password': {
        setState((s) => ({ ...s, confirm_password: value }))
        break
      }

      default:
        break
    }
  }

  const onSubmit = () => {
    if (!state.is_sign_up) {
      signIn({ email: state.email, password: state.password }).then((r) => {
        console.log('onSubmit -> r', r)

        if (r.success) {
          document.cookie = `${AUTHEN_TOKEN_WEB_TECK}=${(r.data as IPayloadUser).token}`
          Router.replace('/')
        }
      })
      // signUpMongo({
      //   email: state.email,
      //   password: state.password,
      //   confirm_password: state.confirm_password,
      // })
    }
  }

  return (
    <div className="view-container-login">
      <div className="view-content-login">
        <div className="view-icon-login">
          <div className="icon-login" />
        </div>
        <div className="view-label-login">LOG IN</div>

        <div className="view-from-login">
          <div>
            <Input value={state.email} onChange={onChangeText} name="email" placeholder="email" />
          </div>
          <div>
            <Input
              value={state.password}
              onChange={onChangeText}
              name="password"
              security="password"
              placeholder="password"
            />
          </div>

          {state.is_sign_up ? (
            <div>
              <Input
                value={state.confirm_password}
                onChange={onChangeText}
                name="confirm_password"
                security="password"
                placeholder="confirm_password"
              />
            </div>
          ) : null}

          <Button onClick={onSubmit}>{state.is_sign_up ? 'SIGN UP' : 'SIGN IN'}</Button>

          <div>
            Bạn chưa có tài khoản?{' '}
            <div onClick={toggle_sign} tabIndex={-1} aria-hidden>
              Đăng ký ngay
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

Login.getInitialProps = async (ctx) => {
  const cookies2 = cookies(ctx)

  const token = cookies2[AUTHEN_TOKEN_WEB_TECK]
  if (token)
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/' })
      ctx.res.end()
    } else {
      Router.replace('/')
    }

  return { search: 'haha', authen: token }
}
