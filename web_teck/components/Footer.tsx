import React from 'react'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 logo footer__top--col-1">
              <a href="index.html">
                <img alt="" src="/themes/itrithuc/resources/images/logo-footer.png" />
              </a>
            </div>
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12 info footer__top--col-6">
              <ul>
                <li>
                  <strong>Bộ Khoa học và Công nghệ</strong>
                  <br />
                  <strong>Cục thông tin Khoa học và Công nghệ Quốc gia -</strong>
                  <strong>Văn phòng Đề án Hệ tri thức Việt số hóa</strong>
                </li>
                <li>
                  <i className="fa fa-envelope" /> itrithuc@vista.gov.vn
                </li>
                <li>
                  <i className="fa fa-phone-square" /> <a href="tel:02439341408">(024)39341408</a>
                </li>
                <li>
                  <i className="fa fa-home" />
                  Phòng 616, 24 Lý Thường Kiệt, Hà Nội
                </li>
              </ul>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-3 col-xs-6 menu footer__top--col-3">
              <ul className="menu-ft">
                <li>
                  <a href="/about.html" title="Giới thiệu">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="https://ghinhan.itrithuc.vn/" title="Tôn vinh">
                    Tôn vinh
                  </a>
                </li>
                <li>
                  <a href="/tintuc.html" title="Tin tức">
                    Tin tức
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-3 col-xs-6 menu footer__top--col-3">
              <ul className="menu-ft">
                <li>
                  <a href="/articles/chinh-sach-danh-cho-nguoi-tham-gia-1.html" title="Chính sách">
                    Chính sách
                  </a>
                </li>
                <li>
                  <a href="/contact.html" title="Liên hệ">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copyright"> © Copyright 2018 - 2020 </div>
    </footer>
  )
}

export default Footer
