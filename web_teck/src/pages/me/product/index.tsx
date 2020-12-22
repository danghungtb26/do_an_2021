import { Container, Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import Router from 'next/router'
import React from 'react'
import { getProductListOfUser } from 'src/api'
import type { IPayloadProduct } from 'src/api/types'
import { ButtonLink, Table } from 'src/components'
import Header from 'src/components/Header/Header'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'
import ProductList from 'src/features/user/ProductList'

interface IProductPage {}

interface IProductPageState {
  data: IPayloadProduct[]
  page: {
    current: number
    max: number
  }
  count: number
  loading: boolean
}

class ProductPage extends React.Component<IProductPage, IProductPageState> {
  renderHeader = () => {
    return (
      <Grid container style={{ height: 48, alignItems: 'center' }}>
        <Grid item md={10}>
          <div className="txt-title-header-product-list">Danh sách sản phẩm</div>
        </Grid>
        <Grid item md={2}>
          <ButtonLink title="Tạo mới" href="/me/product/new" />
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div style={{ minHeight: '80vh', paddingTop: 100, paddingBottom: 100 }}>
          <Container>
            {this.renderHeader()}
            <ProductList />
          </Container>
          {/* <Footer /> */}
        </div>
      </>
    )
  }
}

export default ProductPage
