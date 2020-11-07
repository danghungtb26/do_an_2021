import { Container, Grid } from '@material-ui/core'
import { checkTokenInInitial, getInitialTokenProps } from 'commons'
import { Router } from 'next/router'
import React from 'react'
import { roles } from '../../../constants'
import { ButtonLink, Footer, Navbar, Table } from '../../../components'

interface IProductPage {}

class ProductPage extends React.Component<IProductPage> {
  static getInitialProps = async (ctx: any) => {
    await checkTokenInInitial(ctx)
    const { user } = await getInitialTokenProps(ctx)
    if (!user?.id || user?.role !== roles.user)
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
      } else {
        Router.replace('/login')
      }

    return { user }
  }

  columns: Array<{
    id: string
    label: string
    minWidth?: string | number
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
    },
    {
      id: 'comment_count',
      label: 'comment_count',
      minWidth: '10%',
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
    },

    {
      id: 'actions',
      label: 'actions',
      minWidth: 150,
    },
  ]

  constructor(props: IProductPage) {
    super(props)
    this.state = {}
  }

  renderHeader = () => {
    return (
      <Grid container style={{ height: 48, alignItems: 'center' }}>
        <Grid item md={10}>
          <div className="txt-title-header-product-list">Danh sách sản phẩm của bạn</div>
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
        <Navbar {...this.props} />

        <div className="site-section">
          <div className="container">
            <Container style={{ flex: 1, minHeight: '80vh' }}>
              <Grid container>
                {this.renderHeader()}
                <Grid>
                  <Table data={[]} columns={this.columns} />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default ProductPage
