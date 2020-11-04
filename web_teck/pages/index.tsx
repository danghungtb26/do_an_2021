import React from 'react'
import cookies from 'next-cookies'

import { Breadcrumb, Footer, Navbar, Sidebar } from '../components'
import { AUTHEN_TOKEN_WEB_TECK } from '../constants'
import { getInitialTokenProps } from '../commons'

export default function Home(props) {
  React.useEffect(() => {
    return () => {
      console.log('unmout')
    }
  })
  return (
    <>
      <Navbar {...props} />
      <Breadcrumb />

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <div className="articles_detail div_conent_bo">
                <h2 className="class_title">Giới thiệu</h2>

                <div className="detail_c">
                  <p style={{ textAlign: 'justify' }}>
                    <img
                      alt=""
                      src="/images/121.jpg"
                      style={{
                        height: '500px',
                        margin: '5px 0px',
                        width: '100%',
                      }}
                    />
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    Đề án “Phát triển Hệ tri thức Việt số hóa” được phê duyệt theo Quyết định số
                    677/QĐ-TTg ngày 18 tháng 5 năm 2017 của Thủ tướng Chính phủ. Đây là một trong
                    các hoạt động cụ thể nhằm triển khai Chỉ thị 16/CT-TTg của Thủ tướng Chính phủ
                    về tăng cường năng lực tiếp cận cuộc Cách mạng công nghiệp lần thứ tư. Đúng 10
                    giờ 10 phút 10 giây ngày 01/01/2018, tại Hà Nội, Đề án đã được chính thức khởi
                    động dưới sự chủ trì của Phó Thủ tướng Chính phủ Vũ Đức Đam với thông điệp “Chia
                    sẻ tri thức - Cổ vũ sáng tạo - Kết nối cộng đồng – Vì tương lai Việt Nam”.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    Mục tiêu của Đề án là nhằm xây dựng nền tảng hạ tầng dữ liệu và tri thức trong
                    các lĩnh vực, đặc biệt là những lĩnh vực liên quan trực tiếp đến đời sống của
                    người dân như giáo dục, y tế, chăm sóc sức khỏe, nông nghiệp, văn hóa… nhằm tạo
                    điều kiện cho học tập, làm chủ tri thức, nghiên cứu và phát triển các ứng dụng
                    công nghệ thông tin trên nền tảng AI và BigData phục vụ cho cộng đồng và xã hội.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    Các dữ liệu và tri thức được kết nối và chia sẻ với cấp số nhân, được phổ biến
                    nhanh chóng và rộng rãi sẽ xoá bỏ khoảng cách số, tạo cơ hội để mọi người tiếp
                    cận sử dụng, tạo ra giá trị gia tăng cho cả cộng đồng. Đây là cốt lõi để triển
                    khai phát triển hệ thống đổi mới sáng tạo quốc gia, thúc đẩy khởi nghiệp sáng
                    tạo trong mọi ngành, lĩnh vực, khơi dậy niềm đam mê và khát vọng sáng tạo, nhất
                    là thế hệ trẻ.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    Trong khuôn khổ Đề án, đã hình thành nhiều nền tảng số tiêu biểu như:{' '}
                    <a href="https://itrithuc.vn/catalog/du-an/ban-do-itrithuc-91.html">
                      Bản đồ số Việt Nam
                    </a>{' '}
                    (vmap.vn),{' '}
                    <a href="https://itrithuc.vn/catalog/du-an/inhandao-93.html">Nhân đạo số</a>{' '}
                    (inhandao.vn),{' '}
                    <a href="https://itrithuc.vn/catalog/du-an/giao-duc-so-94.html">Giáo dục số</a>{' '}
                    (igiaoduc.vn),{' '}
                    <a href="https://itrithuc.vn/duannew/du-an-moi/bach-khoa-toan-thu-viet-nam-5.html">
                      Bách khoa toàn thư mở
                    </a>{' '}
                    (bachkhoathu.itrithuc.vn),{' '}
                    <a href="https://itrithuc.vn/duannew/du-an-moi/du-lieu-di-san-so-6.html">
                      Di sản số,
                    </a>
                    … giúp kết nối các cộng đồng và mọi người dân cùng chung tay đóng góp và chia sẻ
                    các nguồn lực trên nền tảng công nghệ tiên tiến, làm giàu nền tảng tri thức Việt
                    Nam.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    Tất cả các bộ, ngành, địa phương, doanh nghiệp, tổ chức và người dân, đặc biệt
                    là các bạn thanh niên với nhiệt huyết và nhiệt tình cống hiến đều được khuyến
                    khích tham gia triển khai các dự án trong khuôn khổ Đề án và được vinh danh xứng
                    đáng với những đóng góp quý báu của mình.
                  </p>
                  <div>&nbsp;</div>
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

Home.getInitialProps = async (ctx) => {
  const { token } = await getInitialTokenProps(ctx)
  console.log('Home.getInitialProps -> cookies2', token)

  // console.log('object')

  return { search: 'haha', authen: token }
}
