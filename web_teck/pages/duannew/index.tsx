import { getProductList } from 'api'
import type { IPayloadProduct, IPayloadUser } from 'api/types'
import { getInitialTokenProps } from 'commons'
import type { NextPage } from 'next'
import moment from 'moment'
import React from 'react'
import { Breadcrumb, Footer, Navbar, Sidebar } from '../../components'

interface IDuanNewProps {
  product: IPayloadProduct[]
  authen?: string
  success?: boolean
  message?: string
  code?: string
  count?: number
  user?: IPayloadUser
}

const DuanNew: NextPage<IDuanNewProps> = ({ product, authen, user }) => {
  // const [productState, setProduct] = React.useState<IPayloadProduct[]>(product)
  // console.log('productState', product)

  return (
    <>
      <Navbar authen={authen} user={user} />
      <Breadcrumb />
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
                        className="post-8 post type-post status-publish format-standard has-post-thumbnail hentry">
                        <div className="row">
                          <div className="entry-media col-xs-12 col-sm-4">
                            <a
                              href="/duannew/du-an-tiem-nang/he-thong-tu-van-thong-minh-ve-dinh-duong-va-ve-sinh-an-toan-thuc-pham-8.html"
                              className="entry-media-inner">
                              <img
                                src="/images/21.png"
                                className="attachment-fw-blog-post-shortcode size-fw-blog-post-shortcode wp-post-image"
                                alt="Hệ thống tư vấn thông minh dinh dưỡng, vệ sinh, an toàn thực phẩm"
                              />
                            </a>
                          </div>

                          <div className="entry-content-wrapper col-xs-12 col-sm-8">
                            <h3 className="entry-title">
                              <a href="/">{i.title}</a>
                            </h3>

                            <div
                              className="entry-excerpt"
                              style={{ marginTop: 12 }}
                              dangerouslySetInnerHTML={{
                                __html: `${i.sort_description}`,
                              }}
                            />

                            <div className="entry-meta" style={{ marginBottom: '1rem' }}>
                              <span className="entry-date" style={{ color: '#ababab' }}>
                                {`Ngày ${moment(i.created_at).format()} |`}
                                <a
                                  href="/duannew/du-an-tiem-nang/he-thong-tu-van-thong-minh-ve-dinh-duong-va-ve-sinh-an-toan-thuc-pham-8.html"
                                  style={{ color: '#ababab' }}>
                                  Xem tiếp
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

DuanNew.getInitialProps = async (ctx: any) => {
  const { token, user } = await getInitialTokenProps(ctx)
  const result = await getProductList({
    authen: token,
    limit: 10,
    skip: 0,
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
    count: result?.count,
  }
}

export default DuanNew
