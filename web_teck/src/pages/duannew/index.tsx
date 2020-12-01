import { getProductList } from 'src/api'
import type { IPayloadProduct, IPayloadUser } from 'src/api/types'
import { getInitialTokenProps } from 'src/commons'
import type { NextPage } from 'next'
import moment from 'moment'
import React from 'react'
import { Grid } from '@material-ui/core'
import { VisibilityOutlined, CommentOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { format_date } from 'src/constants'
import { Breadcrumb, Footer, Navbar, Sidebar } from 'src/components'

interface IDuanNewProps {
  product: IPayloadProduct[]
  authen?: string
  success?: boolean
  message?: string
  code?: string
  count: number
  page: number
  user?: IPayloadUser
}

const DuanNew: NextPage<IDuanNewProps> = ({ product, authen, user, count, page }) => {
  // const [productState, setProduct] = React.useState<IPayloadProduct[]>(product)
  // console.log('productState', product)
  const router = useRouter()
  const onChangePage: (_: any, page2: number) => void = (_, page2) => {
    router.push({
      pathname: `/duannew`,
      query: {
        page: page2,
      },
    })
  }

  return (
    <>
      <Navbar authen={authen} user={user} />
      {/* <Breadcrumb /> */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <div id="primary" className="content-area">
                <div className="primary-content">
                  {product.map((i) => {
                    return (
                      <article
                        key={i.id}
                        id="post-8"
                        className="post-8 post box-article-product type-post status-publish format-standard has-post-thumbnail hentry">
                        <Grid container>
                          <Grid md={1}>
                            <img
                              className="pointer"
                              style={{ width: 40, height: 40, borderRadius: 40 }}
                              alt=""
                              src="/images/user_profile.png"
                            />
                          </Grid>
                          <Grid md={11}>
                            <Grid
                              container
                              style={{ marginTop: '2px', alignItems: 'center', display: 'flex' }}>
                              <div className="pointer box-article-user">
                                {(i.owner as IPayloadUser)?.name}
                              </div>
                              <div className="box-article-created-at">
                                {moment(i.created_at).format(format_date.HH_mm_DD_MM_YYYY)}
                              </div>
                            </Grid>
                            <Grid container>
                              <Link href={`/duannew/${i.id}`}>
                                <div className="pointer box-article-title three-dot">{i.title}</div>
                              </Link>
                            </Grid>
                            <Grid container>
                              <div className="three-line three-dot box-article-sort-description">
                                {i.sort_description}
                              </div>
                            </Grid>
                            <Grid container style={{ marginTop: '4px', marginBottom: '4px' }}>
                              <div>
                                <Grid container style={{ alignItems: 'center', display: 'flex' }}>
                                  <ThumbUpAltOutlined style={{ fontSize: 12, color: '#9b9b9b' }} />
                                  <div className="txt-view">{`${i.react_count}`}</div>
                                </Grid>
                              </div>
                              <div style={{ marginLeft: '12px' }}>
                                <Grid container style={{ alignItems: 'center', display: 'flex' }}>
                                  <VisibilityOutlined style={{ fontSize: 12, color: '#9b9b9b' }} />
                                  <div className="txt-view">{`${i.view_count}`}</div>
                                </Grid>
                              </div>
                              <div style={{ marginLeft: '12px' }}>
                                <Grid container style={{ alignItems: 'center', display: 'flex' }}>
                                  <CommentOutlined style={{ fontSize: 12, color: '#9b9b9b' }} />
                                  <div className="txt-view">{`${i.comment_count}`}</div>
                                </Grid>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </article>
                    )
                  })}
                </div>
                <div className="view-pagination">
                  <Pagination
                    onChange={onChangePage}
                    count={Math.ceil(count / 10)}
                    defaultValue={page}
                    variant="outlined"
                    color="secondary"
                  />
                </div>
              </div>
            </div>
            {/* <Sidebar /> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

DuanNew.getInitialProps = async (ctx: any) => {
  const { token, user } = await getInitialTokenProps(ctx)
  const { page } = ctx.query
  const result = await getProductList({
    authen: token,
    limit: 10,
    skip: (page - 1) * 10,
    sort: [{ name: 'created_at', desc: true }],
    keyword: '',
  })

  return {
    authen: token,
    user,
    product: (result?.data as IPayloadProduct[]) ?? [],
    success: result.success,
    message: result?.message,
    code: result?.code,
    count: result?.count ?? 10,
    page: page || 1,
  }
}

export default DuanNew
