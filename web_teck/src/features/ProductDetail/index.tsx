import { Container, Grid } from '@material-ui/core'
import {
  CommentOutlined,
  CreateRounded,
  PersonAddRounded,
  StarRounded,
  ThumbUpAltOutlined,
  VisibilityOutlined,
} from '@material-ui/icons'
import React from 'react'
import { getProductDetail } from 'src/api'
import type { IPayloadProduct, IPayloadUser } from 'src/api/types'
import { AUTHEN_TOKEN_WEB_TECK, format_date } from 'src/constants'
import styles from 'src/styles/css/Product/ProductDetail.module.css'
import moment from 'moment'

interface IProductDetailProps {
  id: string | number
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const [data, setData] = React.useState<IPayloadProduct>()
  console.log('🚀 ~ file: index.tsx ~ line 23 ~ data', data)

  const { id } = props

  const fetchData = async () => {
    const authen = (await localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)) || ''
    const result = await getProductDetail({ authen, id: `${id}` })
    if (result.success) {
      setData(result.data as IPayloadProduct)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [id])

  const renderInfo = React.useCallback(({ label, value }) => {
    return (
      <Grid container style={{ alignItems: 'center', padding: '4px 0px' }}>
        <Grid item md={3}>
          <div className={`${styles['txt-label-key']}`}>{label}</div>
        </Grid>
        <Grid item md={9} style={{ paddingLeft: 8 }}>
          <div className={`${styles['txt-created-at']}`}>{value}</div>
        </Grid>
      </Grid>
    )
  }, [])

  const renderUser = React.useCallback(() => {
    if (!data?.owner) return null
    return (
      <Grid item md={12}>
        <Grid container>
          <Grid item md={2}>
            <div className={`${styles['view-image-user']}`} />
          </Grid>
          <div className={`${styles['view-user-info']}`}>
            <div className={`${styles['txt-user-name']}`}>
              {(data?.owner as IPayloadUser)?.name || 'Tên của user'}
            </div>
            <div className={`${styles['row-info']}`}>
              <div className={`${styles['row-info']} ${styles['align-center']}`}>
                <StarRounded className={`${styles['view-count']}`} />
                <div className={`${styles['view-count']} ${styles['txt-count']}`}>113</div>
              </div>
              <div className={`${styles['row-info']} ${styles['align-center']}`}>
                <PersonAddRounded className={`${styles['view-count']}`} />
                <div className={`${styles['view-count']} ${styles['txt-count']}`}>45</div>
              </div>
              <div className={`${styles['row-info']} ${styles['align-center']}`}>
                <CreateRounded className={`${styles['view-count']}`} />
                <div className={`${styles['view-count']} ${styles['txt-count']}`}>7</div>
              </div>
            </div>
          </div>
        </Grid>
        <div className={styles.line} />
        <Grid container>
          <Grid item md={2} />
          <Grid item md={10}>
            <div className={`${styles['view-user-info']}`}>
              {renderInfo({
                label: 'Public:',
                value: moment(data?.created_at).format(format_date.HH_mm_DD_MM_YYYY),
              })}
              {renderInfo({
                label: 'Đối tượng:',
                value: 'Unknown',
              })}
              {renderInfo({
                label: 'Chi phí:',
                value: data?.budget,
              })}
              {renderInfo({
                label: 'Dự kiến',
                value: data?.deployment_time,
              })}

              <div className={`${styles['row-info']} ${styles['view-created-at']}`}>
                <div className={`${styles['row-info']} ${styles['align-center']}`}>
                  <ThumbUpAltOutlined className={`${styles['view-count']}`} />
                  <div className={`${styles['view-count']} ${styles['txt-count']}`}>
                    {data?.react_count}
                  </div>
                </div>
                <div className={`${styles['row-info']} ${styles['align-center']}`}>
                  <CommentOutlined className={`${styles['view-count']}`} />
                  <div className={`${styles['view-count']} ${styles['txt-count']}`}>
                    {data?.comment_count}
                  </div>
                </div>
                <div className={`${styles['row-info']} ${styles['align-center']}`}>
                  <VisibilityOutlined className={`${styles['view-count']}`} />
                  <div className={`${styles['view-count']} ${styles['txt-count']}`}>
                    {data?.view_count}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }, [data?.owner])

  const renderContent = React.useCallback(() => {
    if (!data) return null
    return (
      <div style={{ marginTop: 24 }}>
        <div className={`${styles['txt-title-article']}`}>{data?.title}</div>
        <div className={`${styles['txt-sort-description-article']}`}>
          {`${data?.sort_description || ''}`.slice(0, 200)}
        </div>
        <div
          className={`${styles['txt-description-article']}`}
          dangerouslySetInnerHTML={{ __html: data?.description || '' }}
        />
      </div>
    )
  }, [data])

  const renderCommentItem = React.useCallback(() => {
    return (
      <Grid item md={12}>
        <Grid container>
          <Grid item md={8}>
            <div className={styles['view-user-comment']}>
              <div className={styles['view-image-user-comment']} />
              <div className={styles['txt-user-name-comment']}>Tên của user</div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className={`${styles['view-user-comment']} ${styles['txt-comment-create']}`}>
              {moment().format(format_date.HH_mm_DD_MM_YYYY)}
            </div>
          </Grid>
        </Grid>
        <div className={styles['txt-content-comment']}>Baif viet nay la nhu nao the</div>
      </Grid>
    )
  }, [])

  const renderComment = React.useCallback(() => {
    if (!data?.id) return null
    return (
      <div style={{ marginTop: 24 }}>
        <div className={styles['txt-comment']}>Comments</div>

        <div className={styles['view-comment']}>{renderCommentItem()}</div>
      </div>
    )
  }, [data?.id])

  return (
    <Container>
      <Grid container style={{ padding: '24px' }}>
        <Grid item md={8}>
          {renderContent()}
        </Grid>
        <Grid item md={4}>
          {renderUser()}
        </Grid>
      </Grid>
      <Grid container style={{ padding: 24 }}>
        <Grid item md={12}>
          {renderComment()}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetail
