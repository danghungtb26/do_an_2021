import { Button, CircularProgress, Container, Grid, TextField } from '@material-ui/core'
import Router from 'next/router'
import React from 'react'
import { AUTHEN_TOKEN_WEB_TECK, roles } from 'src/constants'
import { addProduct } from 'src/api'
import { checkTokenInInitial, getInitialTokenProps } from 'src/commons'

import { Editor, Footer, Navbar } from 'src/components'

interface INewProductPageProps {
  authen: string
}

interface INewProductPageState {
  title: string
  keyword: string
  sortDescription: string
  description: string
  loading: boolean
  budget: string
  deployment_time: string
}

class NewProductPage extends React.Component<INewProductPageProps, INewProductPageState> {
  static getInitialProps = async (ctx: any) => {
    await checkTokenInInitial(ctx)
    const { user, token } = await getInitialTokenProps(ctx)
    if (!user?.id || user?.role !== roles.user)
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
      } else {
        Router.replace('/login')
      }

    return { user, authen: token }
  }

  constructor(props: INewProductPageProps) {
    super(props)
    this.state = {
      title: '',
      keyword: '',
      sortDescription: '',
      description: '',
      budget: '',
      deployment_time: '',
      loading: false,
    }
  }


  componentDidMount() {
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    if (!authen) Router.push('/login')
  }

  onChangeTitle = (event) => {
    const { value } = event.target
    this.setState({ title: value })
  }

  onChangeKeyword = (event) => {
    const { value } = event.target
    this.setState({ keyword: value })
  }

  onChangeBudget = (event) => {
    const { value } = event.target
    this.setState({ budget: `${value}`.replace(/\D/g, '') })
  }

  onChangeTime = (event) => {
    const { value } = event.target
    this.setState({ deployment_time: `${value}`.replace(/\D/g, '') })
  }

  onChangeSortDescription = (e) => {
    const { value } = e.target
    this.setState({ sortDescription: value })
  }

  onChangeDescription = (e) => {
    this.setState({ description: e })
  }

  onSubmit = () => {
    const { title, keyword, sortDescription, description, budget, deployment_time } = this.state
    const { authen } = this.props
    if (!title || !sortDescription || !description) return
    const param = {
      authen,
      title,
      keyword,
      sort_description: sortDescription,
      description,
      budget,
      deployment_time,
    }

    this.setState({ loading: true }, () => {
      addProduct(param).then((r) => {
        if (r.success) {
          this.setState({ title: '', keyword: '', sortDescription: '', description: '' })
          Router.replace('/me?tabindex=product', undefined, { shallow: true })
        }
      })
    })
  }

  renderTitle = () => {
    const { title } = this.state

    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Tiêu đề *</div>
        </Grid>

        <TextField variant="outlined" fullWidth value={title} onChange={this.onChangeTitle} />
      </Grid>
    )
  }

  renderKeyword = () => {
    const { keyword } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Keyword</div>
        </Grid>

        <TextField variant="outlined" fullWidth value={keyword} onChange={this.onChangeKeyword} />
      </Grid>
    )
  }

  renderBudget = () => {
    const { budget } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Kinh phí (VND)</div>
        </Grid>

        <TextField variant="outlined" fullWidth value={budget} onChange={this.onChangeBudget} />
      </Grid>
    )
  }

  renderDevelopTime = () => {
    const { deployment_time } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Thời gian phát triển (tháng)</div>
        </Grid>

        <TextField
          variant="outlined"
          fullWidth
          value={deployment_time}
          onChange={this.onChangeTime}
        />
      </Grid>
    )
  }

  renderSortDescription = () => {
    const { sortDescription } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Mô tả ngắn *</div>
        </Grid>

        <TextField
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          value={sortDescription}
          onChange={this.onChangeSortDescription}
        />
      </Grid>
    )
  }

  renderDescription = () => {
    const { description } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Mô tả *</div>
        </Grid>

        <Editor value={description} onChange={this.onChangeDescription} />
      </Grid>
    )
  }

  renderHeader = () => {
    return (
      <Grid container className="field-input-product-new">
        <div className="txt-title-header-product-list">Thêm sản phẩm mới</div>
      </Grid>
    )
  }

  renderSubmit = () => {
    const { loading } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Button
          color="secondary"
          onClick={this.onSubmit}
          style={{ backgroundColor: 'tomato', color: 'white' }}>
          {loading ? <CircularProgress size={24} color="primary" /> : null}
          Đăng bài
        </Button>
      </Grid>
    )
  }

  render() {
    return (
      <>
        <Navbar />

        <div className="site-section">
          <div className="container">
            <Container style={{ flex: 1, minHeight: '80vh' }}>
              {this.renderHeader()}
              {this.renderTitle()}
              {this.renderKeyword()}
              {this.renderBudget()}
              {this.renderDevelopTime()}
              {this.renderSortDescription()}
              {this.renderDescription()}
              {this.renderSubmit()}
            </Container>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default NewProductPage
