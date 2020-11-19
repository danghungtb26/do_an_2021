import { Container, Grid } from '@material-ui/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React from 'react'
import moment from 'moment'
import type { IPayloadProduct, IPayloadUser } from 'src/api/types'
import { getProductListOfUser } from 'src/api'
import { Pagination } from '@material-ui/lab'
import { CommentOutlined, ThumbUpAltOutlined, VisibilityOutlined } from '@material-ui/icons'
import { format_date, roles } from 'src/constants'
import { checkTokenInInitial, getInitialTokenProps } from 'src/commons'
import { ButtonLink, Footer, Navbar } from 'src/components'

interface IMePageProps {
  user?: IPayloadUser
  keyword?: string
  page?: number | string
  tabindex?: string | 'profile' | 'product' | 'article'
  product: Array<IPayloadProduct>
  count: number
}

const tabvalue = {
  profile: 'profile',
  product: 'product',
  article: 'article',
}

const RenderProduct: React.FC<IMePageProps> = (props) => {
  const { count, page, product, tabindex } = props
  const router = useRouter()
  const onChangePage: (_: any, page2: number) => void = (_, page2) => {
    router.push({
      query: {
        tabindex,
        page: page2,
      },
    })
  }

  return (
    <div id="primary" className="content-area">
      <Grid container style={{ height: 48, alignItems: 'center' }}>
        <Grid item md={10}>
          <div className="txt-title-header-product-list">Danh sách sản phẩm</div>
        </Grid>
        <Grid item md={2}>
          <ButtonLink title="Tạo mới" href="/me/product/new" />
        </Grid>
      </Grid>
      <div className="primary-content">
        {product.map((i) => {
          return (
            <article
              key={i.id}
              id="post-8"
              className="post-8 post box-article-product type-post status-publish format-standard has-post-thumbnail hentry">
              <Grid container>
                <div className="pointer box-article-title three-dot">{i.title}</div>
              </Grid>
              {/* <Grid container>
                <div className="three-line three-dot box-article-sort-description">
                  {i.sort_description}
                </div>
              </Grid> */}
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
                <div className="box-article-created-at">
                  {moment(i.created_at).format(format_date.HH_mm_DD_MM_YYYY)}
                </div>
              </Grid>
            </article>
          )
        })}
      </div>
      {count > 10 ? (
        <div className="view-pagination">
          <Pagination
            onChange={onChangePage}
            count={Math.ceil(count / 10)}
            defaultValue={page}
            variant="outlined"
            color="secondary"
          />
        </div>
      ) : null}
    </div>
  )
}

const RenderArticle: React.FC<IMePageProps> = () => {
  return null
}

/**
 * page chứa thông tin của user
 * bao gồm các banner khác và thông tin cơ bản của user
 */
const MePage: NextPage<IMePageProps> = (props) => {
  const { user, tabindex } = props

  const renderTab = () => {
    switch (tabindex) {
      case tabvalue.product:
        return <RenderProduct {...props} />

      case tabvalue.article:
        return <RenderArticle {...props} />

      default:
        return (
          <Grid container style={{ justifyContent: 'space-between' }}>
            <Grid item md={9}>
              <div className="txt-label-info-introduction">Thông tin giới thiệu</div>
              <div>
                <Grid container className="view-info">
                  <Grid item md={3}>
                    <div className="txt-label-info">Tên:</div>
                  </Grid>
                  <Grid item md={8}>
                    <div className="txt-value-info">{user?.name}</div>
                  </Grid>
                </Grid>
                <Grid container className="view-info">
                  <Grid item md={3}>
                    <div className="txt-label-info">Ngày sinh:</div>
                  </Grid>
                  <Grid item md={8}>
                    <div className="txt-value-info">{moment().format(format_date.DD_MM_YYYY)}</div>
                  </Grid>
                </Grid>
                <Grid container className="view-info">
                  <Grid item md={3}>
                    <div className="txt-label-info">Số điện thoại:</div>
                  </Grid>
                  <Grid item md={8}>
                    <div className="txt-value-info">{user?.phone ?? ''}</div>
                  </Grid>
                </Grid>
                <Grid container className="view-info">
                  <Grid item md={3}>
                    <div className="txt-label-info">Email:</div>
                  </Grid>
                  <Grid item md={8}>
                    <div className="txt-value-info">{user?.email}</div>
                  </Grid>
                </Grid>
                <Grid container className="view-info">
                  <Grid item md={3}>
                    <div className="txt-label-info">Mô tả:</div>
                  </Grid>
                  <Grid item md={8}>
                    <div className="txt-value-info">{user?.introduction}</div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="btn-edit-profile">Edit profile</div>
            </Grid>
          </Grid>
        )
    }
  }

  const router = useRouter()
  return (
    <>
      <Navbar {...props} />
      {/* <Breadcrumb /> */}

      <div className="site-section">
        <div className="container">
          <Container style={{ minHeight: '100vh' }}>
            <Grid container>
              <Grid item md={3}>
                <img src="/images/user_profile.png" alt="" />
                <div style={{ marginTop: '24px', marginLeft: '24px' }}>
                  <Link href={`${router.pathname}?tabindex=${tabvalue.profile}`}>
                    <div className="txt-profile-menu">Thông tin</div>
                  </Link>
                  <Link href={`${router.pathname}?tabindex=${tabvalue.product}`}>
                    <div className="txt-profile-menu">Sản phẩm ({user?.product_count})</div>
                  </Link>
                  <Link href={`${router.pathname}?tabindex=${tabvalue.article}`}>
                    <div className="txt-profile-menu">Bài viết ({user?.article_count})</div>
                  </Link>
                </div>
              </Grid>

              <Grid item md={9} style={{ padding: '24px' }}>
                {renderTab()}
              </Grid>
            </Grid>
          </Container>
        </div>
        {/* <Sidebar /> */}
      </div>
      <Footer />
    </>
  )
}

MePage.getInitialProps = async (ctx) => {
  await checkTokenInInitial(ctx)
  const { user, token } = await getInitialTokenProps(ctx)
  if (!user?.id || user?.role !== roles.user)
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.replace('/login')
    }

  const { tabindex, page, keyword } = ctx.query

  const responseParam = {
    user,
    tabindex: tabindex as string,
    page: page as string,
    keyword: keyword as string,
    product: [],
    count: 0,
  }

  if (tabindex === tabvalue.product) {
    const result = await getProductListOfUser({
      authen: token,
      limit: 10,
      skip: (Number(page) - 1) * 10,
      keyword: '',
    })
    const product: Array<IPayloadProduct> = (result?.data as Array<IPayloadProduct>) ?? []
    const count: number = result?.count ?? 10
    return {
      ...responseParam,
      product,
      count,
    }
  }

  return {
    ...responseParam,
  }
}

export default MePage
