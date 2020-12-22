import React, { useCallback, useEffect } from 'react'
import Slider from 'react-slick'
import { getProductBanner } from 'src/api'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { baseUrlImage } from 'src/api/client'
import type { IPayloadProduct } from 'src/api/types'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'
import { Container } from '@material-ui/core'
import styles from '../css/banner.module.css'

interface IProps {}

const Banner: React.FC<IProps> = () => {
  const [data, setData] = React.useState<IPayloadProduct[]>([])

  const renderItem = useCallback((item) => {
    return (
      <div key={item.id} className={styles['view-item-banner']}>
        <div className={styles['content-item-banner']}>
          <img
            src={
              Array.isArray(item.attachment) && item.attachment.length > 0
                ? `${baseUrlImage}${item.attachment[0]}`
                : '/images/test.jpg'
            }
            alt={item.title}
            className={styles.image}
          />
          <h4 className="three-dot three-line" style={{ width: '100%' }}>
            {item.title}
          </h4>
        </div>
      </div>
    )
  }, [])

  const fetchData = async () => {
    const authen = await localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    const result = await getProductBanner({
      authen: authen || '',
      skip: 0,
      limit: 10,
      sort: [{ name: 'view_count', desc: true }],
    })
    if (result.success) {
      setData(result.data as IPayloadProduct[])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className={styles.container}>
      {/* <h2>Bài viết nổi bật</h2> */}
      <Slider autoplay rows={1} autoplaySpeed={2000} slidesToScroll={1} slidesToShow={5}>
        {data.map(renderItem)}
      </Slider>
    </Container>
  )
}

export default Banner
