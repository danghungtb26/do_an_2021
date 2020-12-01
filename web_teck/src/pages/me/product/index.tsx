import { Container, Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import Router from 'next/router'
import React from 'react'
import { getProductListOfUser } from 'src/api'
import type { IPayloadProduct } from 'src/api/types'
import { ButtonLink, Navbar, Table } from 'src/components'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'

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
  columns: Array<{
    id: string
    label: string
    minWidth?: string | number
    align?: 'start' | 'end' | 'center'
  }> = [
    {
      id: 'id',
      label: 'Mã',
      minWidth: 100,
    },
    {
      id: 'title',
      label: 'Title',
      minWidth: 180,
    },
    {
      id: 'description',
      label: 'description',
      minWidth: 300,
    },
    {
      id: 'react_count',
      label: 'react_count',
      minWidth: '10%',
      align: 'center',
    },
    {
      id: 'comment_count',
      label: 'comment_count',
      minWidth: '10%',
      align: 'center',
    },
    {
      id: 'created_at',
      label: 'created_at',
      minWidth: 120,
    },
    {
      id: 'status',
      label: 'status',
      minWidth: '10%',
      align: 'center',
    },

    {
      id: 'actions',
      label: 'actions',
      minWidth: 150,
      align: 'center',
    },
  ]

  constructor(props: IProductPage) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      page: {
        current: 0,
        max: 10,
      },
      count: 0,
    }
  }

  componentDidMount() {
    this.onGetData()
  }

  componentDidUpdate(_, state: IProductPageState) {
    console.log('🚀 ~ file: index.tsx ~ line 94 ~ ProductPage ~ componentDidUpdate ~ state', state)
    const { page } = this.state
    console.log('🚀 ~ file: index.tsx ~ line 95 ~ ProductPage ~ componentDidUpdate ~ page', page)
    if (page.current !== state.page.current) {
      this.onGetData()
    }
  }

  onGetData = () => {
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    if (!authen) Router.push('/login')
    const { page } = this.state
    console.log('🚀 ~ file: index.tsx ~ line 106 ~ ProductPage ~ page', page)
    getProductListOfUser({
      authen: authen || '',
      skip: page.current * 10,
      limit: 10,
      keyword: '',
    }).then((r) => {
      if (r.success) {
        this.setState({
          data: (r.data as IPayloadProduct[]) || [],
          loading: false,
          page: {
            current: r.page?.current ?? 1,
            max: r.page?.max || 10,
          },
          count: r.count || 0,
        })
      }
    })
  }

  onChangePage = (_, page) => {
    this.setState((s) => ({ page: { current: page, max: s.page.max } }))
  }

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
    const { data, count, page, loading } = this.state

    if (loading) return null
    return (
      <>
        <Navbar />

        <Container style={{ flex: 1, minHeight: '80vh' }}>
          <Grid container>
            {this.renderHeader()}
            <Grid>
              <Table data={data} columns={this.columns} />
            </Grid>
          </Grid>
          <div className="view-pagination">
            <Pagination
              onChange={this.onChangePage}
              count={Math.ceil(count / 10)}
              defaultValue={page.current}
              variant="outlined"
              color="secondary"
            />
          </div>
        </Container>
        {/* <Footer /> */}
      </>
    )
  }
}

export default ProductPage
