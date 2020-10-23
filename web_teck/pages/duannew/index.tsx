import React from 'react'
import { Breadcrumb, Footer, Navbar, Sidebar } from '../../components'

const DuanNew = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <div id="primary" className="content-area">
                <div className="primary-content">
                  {Array.from({ length: 10 }, () => Math.floor(Math.random() * 40)).map((i) => {
                    return (
                      <article
                        key={i}
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
                              <a href="/duannew/du-an-tiem-nang/he-thong-tu-van-thong-minh-ve-dinh-duong-va-ve-sinh-an-toan-thuc-pham-8.html">
                                Hệ thống tư vấn thông minh dinh dưỡng, vệ sinh, an toàn thực phẩm
                              </a>
                            </h3>

                            <div className="entry-excerpt">
                              <p style={{ marginBottom: '0.5rem' }}>
                                Xây dựng Hệ thống tư vấn thông minh về dinh dưỡng và vệ sinh an toàn
                                thực phẩm
                              </p>
                            </div>

                            <div className="entry-meta" style={{ marginBottom: '1rem' }}>
                              <span className="entry-date" style={{ color: '#ababab' }}>
                                Ngày 30-09-2020 11:20:00 AM |
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

export default DuanNew
