import { Container, Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useRouter } from 'next/router'
import React from 'react'
import { getProductList } from 'src/api'
import type { IPayloadProduct } from 'src/api/types'
import { ProductItemOfView } from 'src/components'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'
import { CategoryBar } from '../Category'

interface IProductListProps {
  page: number
  category: number | string
}

/**
 * component hien thi danh sach san pham
 * @param props
 */
const ProductList: React.FC<IProductListProps> = (props) => {
  const [data, setData] = React.useState<IPayloadProduct[]>([])
  const [count, setCount] = React.useState<number>(0)
  const { page = 1 } = props

  const router = useRouter()
  const { category = '' } = router.query

  const fetchData = React.useCallback(async () => {
    const authen = await localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    const result = await getProductList({
      authen: authen || '',
      skip: (page - 1) * 12,
      limit: 12,
      sort: [{ name: 'created_at', desc: true }],
      keyword: '',
      category: (category as string) || '',
    })
    console.log('🚀 ~ file: index.tsx ~ line 38 ~ fetchData ~ result', result)
    if (result.success) {
      setData(result.data as IPayloadProduct[])
      setCount(result.count as number)
    }
  }, [category, page])

  React.useEffect(() => {
    console.log('object')
  }, [])

  React.useEffect(() => {
    console.log('asd')
    fetchData()
  }, [page, category, fetchData])

  const onClickItem = (item: IPayloadProduct) => {
    router.push(`/product/${item.id}`)
  }

  const renderList = React.useCallback(() => {
    if (!Array.isArray(data)) return null
    return (
      <Grid container>
        {data.map((item: IPayloadProduct) => {
          return <ProductItemOfView key={item.id} data={item} onClickItem={onClickItem} />
        })}
      </Grid>
    )
  }, [data])

  const onChangePage: (_: any, page2: number) => void = (_, page2) => {
    router.push(
      {
        pathname: `/product`,
        query: {
          page: page2,
          category,
        },
      },
      undefined
    )
  }

  const renderPage = React.useCallback(() => {
    if (count <= 12) return null
    return (
      <div className="view-pagination">
        <Pagination
          onChange={onChangePage}
          count={Math.ceil(count / 10)}
          defaultValue={page}
          variant="outlined"
          color="secondary"
        />
      </div>
    )
  }, [count, page])

  return (
    <Container>
      <Grid container>
        <CategoryBar category={category as string} />
        <Grid
          item
          xs={12}
          lg={9}
          md={9}
          style={{ backgroundColor: '#d7d7db', padding: '24px 12px' }}>
          {renderList()}
          {renderPage()}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductList
