import { Container, Grid } from '@material-ui/core'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { checkTokenInInitial } from '../../commons'
import { Footer, Navbar, Sidebar } from '../../components'

interface IMePageProps {}

/**
 * page chứa thông tin của user
 * bao gồm các banner khác và thông tin cơ bản của user
 */
const MePage: NextPage<IMePageProps> = (props) => {
  return (
    <>
      <Navbar {...props} />
      {/* <Breadcrumb /> */}

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <Container>
                <Grid container>
                  <Grid item md={3}>
                    <img src="/images/user_profile.png" alt="" />
                  </Grid>
                  <Grid item md={9} style={{ padding: '24px' }}>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                      <Grid item md={9}>
                        <div className="txt-profile-name">Kshiti Ghelani</div>
                        <div className="txt-profile-job">Kỹ sư</div>
                        <div className="txt-profile-rank">Rank: Pro</div>
                        {/* <Grid></Grid> */}
                      </Grid>
                      <Grid item md={2}>
                        <div className="btn-edit-profile">Edit profile</div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: '24px', marginLeft: '24px' }}>
                  <Grid item md={3}>
                    <Link href="/me/product">
                      <div className="txt-profile-menu">Sản phẩm (8)</div>
                    </Link>
                    <Link href="/me/article">
                      <div className="txt-profile-menu">Bài viết (10)</div>
                    </Link>
                  </Grid>
                  <Grid item md={9}>
                    <div className="txt-label-info-introduction">Thông tin giới thiệu</div>
                    <div>
                      <Grid container className="view-info">
                        <Grid item md={3}>
                          <div className="txt-label-info">Tên:</div>
                        </Grid>
                        <Grid item md={8}>
                          <div className="txt-value-info">Kshiti Ghelani</div>
                        </Grid>
                      </Grid>
                      <Grid container className="view-info">
                        <Grid item md={3}>
                          <div className="txt-label-info">Ngày sinh:</div>
                        </Grid>
                        <Grid item md={8}>
                          <div className="txt-value-info">Kshiti Ghelani</div>
                        </Grid>
                      </Grid>
                      <Grid container className="view-info">
                        <Grid item md={3}>
                          <div className="txt-label-info">Số điện thoại:</div>
                        </Grid>
                        <Grid item md={8}>
                          <div className="txt-value-info">Kshiti Ghelani</div>
                        </Grid>
                      </Grid>
                      <Grid container className="view-info">
                        <Grid item md={3}>
                          <div className="txt-label-info">Email:</div>
                        </Grid>
                        <Grid item md={8}>
                          <div className="txt-value-info">Kshiti Ghelani</div>
                        </Grid>
                      </Grid>
                      <Grid container className="view-info">
                        <Grid item md={3}>
                          <div className="txt-label-info">Mô tả:</div>
                        </Grid>
                        <Grid item md={8}>
                          <div className="txt-value-info">Kshiti Ghelani</div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

MePage.getInitialProps = async (ctx) => {
  await checkTokenInInitial(ctx)

  return {}
}

export default MePage
