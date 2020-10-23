import React from 'react'
import moment from 'moment'

const Breadcrumb = (props) => {
  return (
    <div className="site-section-breadcrumbs main__news--default">
      <div className="container main__news--default--right">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="breadcrumb-container">
              <div className="breadcrumbs">
                <span className="first-item">
                  <a href="https://itrithuc.vn/">Trang chủ</a>
                </span>

                <span className="separator">
                  <i className="fa fa-angle-double-right" />
                </span>
                <span className="last-item">
                  <a href="https://itrithuc.vn/about.html">Giới thiệu</a>
                </span>

                <span className="separator separator_c">
                  <img src="/images/calendar_2.png" height="15" alt="" /> Thứ tư,{' '}
                  {moment().locale('vi').format('DD/MM/yyyy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
