import { CircularProgress, Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { getProductNew } from 'src/api'
import type { IPayloadProduct } from 'src/api/types'
import { ProductItemNew } from 'src/components'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'
import styles from '../css/new.module.css'

interface IProps {}

const New: React.FC<IProps> = () => {
  const [data, setData] = React.useState<IPayloadProduct[]>([])
  const [count, setCount] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [loadingPage, setLoadingPage] = useState<boolean>(false)

  const fetchData = async () => {
    const authen = await localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    const result = await getProductNew({
      authen: authen || '',
      skip: (page - 1) * 12,
      limit: 12,
      sort: [{ name: 'created_at', desc: true }],
    })
    if (result.success) {
      setData(result.data as IPayloadProduct[])
      setCount(result.count as number)
      setLoadingPage(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [page])

  const router = useRouter()

  const onClickItem = (item: IPayloadProduct) => {
    router.push(`/product/${item.id}`, undefined, { shallow: true })
  }

  const renderItem = useCallback((item) => {
    return <ProductItemNew key={item.id} data={item} onClickItem={onClickItem} />
  }, [])

  const renderList = useCallback(() => {
    return <Grid container>{data.map(renderItem)}</Grid>
  }, [data])

  const onLoadmore = useCallback(() => {
    setLoadingPage(true)
    setPage((s) => s + 1)
  }, [page, loadingPage])

  const renderPage = useCallback(() => {
    if (count <= 12) return null

    if (loadingPage)
      return (
        <div className="view-pagination">
          <CircularProgress size={24} />
        </div>
      )

    return (
      <div className="view-pagination">
        <div tabIndex={-1} area-hidden onClick={onLoadmore} className={styles['load-more']}>
          Load more
        </div>
      </div>
    )
  }, [count, loadingPage])

  return (
    <div className={styles.container}>
      <h2>Bài viết mới</h2>
      {renderList()}
      {renderPage()}
    </div>
  )
}

export default New
