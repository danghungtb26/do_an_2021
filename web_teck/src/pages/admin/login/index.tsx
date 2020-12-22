import { CircularProgress, Grid } from '@material-ui/core'
import type { GetServerSideProps } from 'next'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
import { signIn } from 'src/api'
import type { IPayloadUser } from 'src/api/types'
import { getInitialTokenAdminProps } from 'src/commons'
import { AUTHEN_TOKEN_ADMIN } from 'src/constants'

interface IProps {}

const LoginPages: React.FC<IProps> = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onChangeText = (event) => {
    const { value, name } = event.target
    switch (name) {
      case 'email': {
        setEmail(value)
        break
      }

      case 'password': {
        setPassword(value)
        setError('')
        break
      }

      default:
        break
    }
  }

  const router = useRouter()

  const onSubmit = () => {
    setLoading(true)
    signIn({ email, password, role: 'admin' })
      .then((r) => {
        if (r.success) {
          document.cookie = `${AUTHEN_TOKEN_ADMIN}=${(r.data as IPayloadUser).token}`
          // localStorage.setItem(AUTHEN_TOKEN_ADMIN, (r.data as IPayloadUser)?.token || '')
          router.push('/admin/product')
        } else {
          setError(r.message || '')
        }
      })
      .finally(() => {
        setLoading(false)
      })
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
              value={email}
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
              value={password}
              name="password"
              onChange={onChangeText}
            />
            <span className="focus-input100" data-placeholder="Mật khẩu" />
          </div>
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
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { token } = await getInitialTokenAdminProps(context)

  if (token) {
    if (context.res) {
      context.res.writeHead(302, { Location: '/admin/product' })
      context.res.end()
    } else {
      Router.replace('/admin/product')
    }
  }

  return {
    props: {
      // token: token || '',
    },
  }
}

export default LoginPages
