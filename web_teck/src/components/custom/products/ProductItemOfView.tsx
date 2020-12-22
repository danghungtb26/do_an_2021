import { Grid } from '@material-ui/core'
import React from 'react'
import type { IPayloadProduct, IPayloadUser } from 'src/api/types'
import { format_date } from 'src/constants'
import moment from 'moment'
import styles from 'src/styles/css/Product/ProductItem.module.css'
import { CommentOutlined, ThumbUpAltOutlined, VisibilityOutlined } from '@material-ui/icons'
import { baseUrlImage } from 'src/api/client'

interface IProductItemOfViewProps {
  data: IPayloadProduct
  onClickItem?: (data: IPayloadProduct) => void
}

const ProductItemOfView: React.FC<IProductItemOfViewProps> = (props) => {
  const { data, onClickItem } = props

  const onClick = () => {
    if (typeof onClickItem === 'function') onClickItem(data)
  }

  return (
    <Grid item xs={12} xl={6} lg={4} md={4} style={{ padding: 8 }} onClick={onClick}>
      <div className={`${styles['view-item']}`}>
        <div className={`${styles['view-image']}`}>
          <img
            className={styles.image}
            src={
              Array.isArray(data.attachment) && data.attachment.length > 0
                ? `${baseUrlImage}${data.attachment[0]}`
                : '/images/test.jpg'
            }
            alt=""
          />
        </div>

        <div>
          <p className={`${styles['txt-title']} three-dot`}>{data.title}</p>
        </div>
        <div className={`${styles['txt-sort-description']} three-dot three-line`}>
          {data.sort_description}
        </div>
        <Grid container>
          <Grid item md={6}>
            <div className={`pointer ${styles['txt-user']} three-dot`}>
              {(data.owner as IPayloadUser)?.name}
            </div>
          </Grid>
          <Grid item md={6}>
            <div className={styles['txt-created-at']}>
              {moment(data.created_at).format(format_date.HH_mm_DD_MM_YYYY)}
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ padding: 8, paddingBlock: 8 }}>
          <Grid item md={4}>
            <Grid container style={{ alignItems: 'center', display: 'flex' }}>
              <ThumbUpAltOutlined style={{ fontSize: 12 }} className={styles['icon-view']} />
              <div className={styles['txt-view']}>{`${data.react_count}`}</div>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container style={{ alignItems: 'center', display: 'flex' }}>
              <VisibilityOutlined className={styles['icon-view']} />
              <div className={styles['txt-view']}>{`${data.view_count}`}</div>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container style={{ alignItems: 'center', display: 'flex' }}>
              <CommentOutlined className={styles['icon-view']} />
              <div className={styles['txt-view']}>{`${data.comment_count}`}</div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

export default ProductItemOfView
