import React from 'react'
import { Breadcrumb, Footer, Navbar, Sidebar } from '../../components'

const Catalog = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <div className="browse2-results">
                {Array.from({ length: 10 }, () => Math.floor(Math.random() * 40)).map((i) => {
                  return (
                    <div key={i} className="browse2-result">
                      <div className="browse2-result-content clearfix">
                        <div className="fl" style={{ padding: '10px', width: '30%' }}>
                          <a
                            title="Công nghệ tiếng nói"
                            href="/catalog/du-an/cong-nghe-tieng-noi-92.html">
                            <img
                              className="s-border fl left"
                              src="/images/image001.jpg"
                              alt="Công nghệ tiếng nói"
                              width=""
                              style={{ margin: '0' }}
                            />
                          </a>
                        </div>
                        <div className="fl" style={{ width: '70%' }}>
                          <div className="browse2-result-header clearfix">
                            <div className="browse2-result-header-content">
                              <div className="browse2-result-title">
                                <h2 className="browse2-result-name">
                                  <a
                                    className="browse2-result-name-link"
                                    href="/catalog/du-an/cong-nghe-tieng-noi-92.html">
                                    Công nghệ tiếng nói
                                  </a>
                                </h2>

                                <a
                                  className="browse2-result-category browse2-result-header-section"
                                  href="/catalog/du-an.html">
                                  Dự án
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="browse2-result-metadata">
                            <div className="browse2-result-description-container">
                              <div className="collapsible">
                                <div className="browse2-result-description collapsible-content">
                                  <div>speech.itrithuc.vn</div>
                                </div>
                              </div>
                            </div>

                            <div className="browse2-result-topics-and-data-types clearfix">
                              <div className="browse2-result-topics">
                                <span className="browse2-result-topic-label">Tags</span>

                                <a
                                  className="browse2-result-topic"
                                  href="/index.php?language=vi&amp;com=catalog&amp;fun=search&amp;q=n%26%23x002F%3Ba&amp;mod=all">
                                  <span>n/a</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="browse2-result-divider" />

                          <div className="browse2-result-metrics">
                            <div className="browse2-result-timestamp">
                              <a href="http://speech.itrithuc.vn/" style={{ fontSize: '14px' }}>
                                <img
                                  alt=""
                                  src="/images/405115_preview.png"
                                  style={{
                                    border: '0px none',
                                    verticalAlign: 'middle',
                                    width: '40px',
                                  }}
                                />
                              </a>
                            </div>

                            <div className="browse2-result-view-count">
                              <div className="browse2-result-view-count-label">Lượt xem</div>

                              <div className="browse2-result-view-count-value">573</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
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

export default Catalog
