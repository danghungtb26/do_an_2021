import React from 'react'

import { Breadcrumb, Footer, Navbar, Sidebar } from '../../components'

const NewPage = () => {
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
                        id="post-26"
                        className="post-26 post type-post status-publish format-standard has-post-thumbnail hentry">
                        <div className="row">
                          <div className="entry-media col-xs-12 col-sm-4">
                            <a
                              href="/tintuc/tin-tuc/phat-dong-chien-dich-thien-nguyen-tren-nen-tang-so-inhandao-26.html"
                              className="entry-media-inner">
                              <img
                                src="/images/anh2.jpg"
                                className="attachment-fw-blog-post-shortcode size-fw-blog-post-shortcode wp-post-image"
                                alt="Phát động Chiến dịch thiện nguyện trên nền tảng số iNhandao"
                              />
                            </a>
                          </div>

                          <div className="entry-content-wrapper col-xs-12 col-sm-8">
                            <h3 className="entry-title">
                              <a href="/tintuc/tin-tuc/phat-dong-chien-dich-thien-nguyen-tren-nen-tang-so-inhandao-26.html">
                                Phát động Chiến dịch thiện nguyện trên nền tảng số iNhandao
                              </a>
                            </h3>

                            <div className="entry-excerpt">
                              <p style={{ marginBottom: '0.5rem' }}>
                                Ngày 1-10, tại Hà Nội, trong khuôn khổ đề án Chính phủ “Phát triển
                                Hệ tri thức Việt số hóa”, Bộ Khoa học và Công nghệ phối hợp với các
                                đơn vị tham gia đề án tổ chức Chương trình “Kết nối triệu con tim”
                                phát động Chiến dịch thiện nguyện trên nền tảng số iNhandao và ra
                                mắt các nền tảng số trong các lĩnh vực giáo dục, y tế, văn hóa. Đến
                                dự có Phó thủ tướng Chính phủ Vũ Đức Đam cùng đại diện lãnh đạo các
                                bộ, ban, ngành, doanh nghiệp.
                              </p>
                            </div>

                            <div className="entry-meta" style={{ marginBottom: '1rem' }}>
                              <span className="entry-date" style={{ color: '#ababab' }}>
                                Ngày 01-10-2020 06:05:00 PM |
                                <a
                                  href="/tintuc/tin-tuc/phat-dong-chien-dich-thien-nguyen-tren-nen-tang-so-inhandao-26.html"
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

                  <div className="pages">
                    <strong>1</strong> <a href="/tintuc/main/page-10.html">2</a>{' '}
                    <a href="/tintuc/main/page-20.html">3</a>&nbsp;&nbsp;
                    <span>
                      <a href="/tintuc/main/page-10.html">Trang sau</a>
                    </span>
                  </div>
                </div>
              </div>
              &nbsp;
            </div>
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default NewPage
