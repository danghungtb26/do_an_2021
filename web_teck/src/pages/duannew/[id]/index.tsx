import { Navbar, Sidebar } from 'src/components'
import { AUTHEN_TOKEN_WEB_TECK, format_date } from 'src/constants'
import type { NextPage } from 'next'
import React from 'react'
import { gql } from '@apollo/client'
import { queryProductDetail, queryStringUser } from 'src/api'
import client from 'src/api/client'
import type { IPayloadProduct, IPayloadUser } from 'src/api/types'
import moment from 'moment'

interface IProjectDetailProps {
  id?: string | number
}

const ProjectDetailPage: NextPage<IProjectDetailProps> = (props) => {
  const [data, setData] = React.useState<IPayloadProduct>({})
  const [loading, setLoading] = React.useState<boolean>(true)
  const [user, setUser] = React.useState<IPayloadUser | undefined>(undefined)

  React.useEffect(() => {
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    const queryString = gql`
      query getData($product_id: String) {
        ${queryStringUser}\n
        ${queryProductDetail}
      }
    `
    const { id } = props
    client
      .query<{ get_user_info: IPayloadUser; get_product_by_id: IPayloadProduct }>({
        query: queryString,
        variables: {
          product_id: id,
        },
        context: {
          headers: {
            authorization: `Bearer ${authen}`,
          },
        },
      })
      .then((r) => {
        setUser(r.data?.get_user_info)
        setData(r.data?.get_product_by_id)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar user={user} loading={loading} />
      {/* <Breadcrumb /> */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <article>
                <h2 className="class_title" itemProp="title">
                  {data?.title}
                </h2>

                <p className="time">
                  <span style={{ color: '#999' }}>
                    Cập nhật vào: {moment(data?.created_at).format(format_date.HH_mm_DD_MM_YYYY)}
                  </span>
                </p>

                <div
                  className="account_content"
                  id="example"
                  dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}
                />

                <div className="box" style={{ marginTop: '20px' }}>
                  <div className="oop fl">
                    <div className="header-oop tag">
                      <strong style={{ fontWeight: 'bold' }}>Từ khóa: {data?.keyword}</strong>
                    </div>

                    <p>
                      {/* <a title="dinh dưỡng" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=dinh+d%C6%B0%E1%BB%A1ng&amp;mod=all">dinh dưỡng</a>,  <a title="an toàn" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=an+to%C3%A0n&amp;mod=all">an toàn</a>,  <a title="hệ thống" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=h%E1%BB%87+th%E1%BB%91ng&amp;mod=all">hệ thống</a>,  <a title="tư vấn" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=t%C6%B0+v%E1%BA%A5n&amp;mod=all">tư vấn</a>,  <a title="vệ sinh" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=v%E1%BB%87+sinh&amp;mod=all">vệ sinh</a>,  <a title="thực phẩm" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=th%E1%BB%B1c+ph%E1%BA%A9m&amp;mod=all">thực phẩm</a>,  <a title="thể lực" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=th%E1%BB%83+l%E1%BB%B1c&amp;mod=all">thể lực</a>,  <a title="cơ sở" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=c%C6%A1+s%E1%BB%9F&amp;mod=all">cơ sở</a>,  <a title="tri thức" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=tri+th%E1%BB%A9c&amp;mod=all">tri thức</a>,  <a title="ứng dụng" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=%E1%BB%A9ng+d%E1%BB%A5ng&amp;mod=all">ứng dụng</a>,  <a title="triển khai" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=tri%E1%BB%83n+khai&amp;mod=all">triển khai</a>,  <a title="cơ quan" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=c%C6%A1+quan&amp;mod=all">cơ quan</a>,  <a title="sản phẩm" href="https://itrithuc.vn/index.php?language=vi&amp;com=duannew&amp;fun=search&amp;q=s%E1%BA%A3n+ph%E1%BA%A9m&amp;mod=all">sản phẩm</a>  */}
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}

ProjectDetailPage.getInitialProps = async ({ query }) => {
  return {
    id: query.id as string,
  }
}

export default ProjectDetailPage
