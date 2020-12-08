import { Grid } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { getCategoryList } from 'src/api/category'
import type { IPayloadCategory } from 'src/api/types'
import styles from 'src/styles/css/Category/CategoryBar.module.css'

interface IProductListProps {
  category: number | string
}

/**
 * component hien thi danh sach san pham
 * @param props
 */
const ProductList: React.FC<IProductListProps> = (props) => {
  const [data, setData] = React.useState<IPayloadCategory[]>([])

  const fetchData = async () => {
    getCategoryList().then((r) => {
      if (r.success) {
        setData(r.data as IPayloadCategory[])
      }
    })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const { category = -1 } = props

  const getCategory = React.useCallback(() => {
    const index = data.findIndex((i) => `${i.id}` === `${category}`)
    return data[Math.max(index, 0)]?.id
  }, [category, data])

  const renderItem = React.useCallback(
    (item) => {
      return (
        <Link key={item.id} href={`product?category=${item.id}`}>
          <div
            className={`${styles['view-category']} ${
              `${item.id}` === `${getCategory()}` ? styles['category-checked'] : ''
            }`}>{`${item.name} (${item.product_count})`}</div>
        </Link>
      )
    },
    [category, getCategory]
  )

  return (
    <Grid item md={3}>
      {data.map((item) => renderItem(item))}
    </Grid>
  )
}

export default ProductList
