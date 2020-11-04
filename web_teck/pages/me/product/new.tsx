import { Button, Container, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { addProduct } from '../../../api'
import { checkTokenInInitial } from '../../../commons'

import { Editor, Footer, Navbar } from '../../../components'

interface INewProductPageProps {
  authen: string
}

interface INewProductPageState {
  title: string
  keyword: string
  sortDescription: string
  description: string
}

class NewProductPage extends React.Component<INewProductPageProps, INewProductPageState> {
  static getInitialProps = async (ctx) => {
    const token = await checkTokenInInitial(ctx)

    return { authen: token }
  }

  constructor(props: INewProductPageProps) {
    super(props)
    this.state = {
      title: '',
      keyword: '',
      sortDescription: '',
      description: '',
    }
  }

  onChangeTitle = (event) => {
    const { value } = event.target
    this.setState({ title: value })
  }

  onChangeKeyword = (event) => {
    const { value } = event.target
    this.setState({ keyword: value })
  }

  onChangeSortDescription = (e) => {
    this.setState({ sortDescription: e })
  }

  onChangeDescription = (e) => {
    this.setState({ description: e })
  }

  onSubmit = () => {
    const { title, keyword, sortDescription, description } = this.state
    const { authen } = this.props
    const param = {
      authen,
      title,
      keyword,
      sort_description: sortDescription,
      description,
    }

    addProduct(param).then((r) => {
      if (r) {
        this.setState({ title: '', keyword: '', sortDescription: '', description: '' })
      }
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

  renderSortDescription = () => {
    const { sortDescription } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Mô tả ngắn *</div>
        </Grid>

        <Editor value={sortDescription} onChange={this.onChangeSortDescription} />
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
    return (
      <Grid container className="field-input-product-new">
        <Button
          color="secondary"
          onClick={this.onSubmit}
          style={{ backgroundColor: 'tomato', color: 'white' }}>
          Đăng bài
        </Button>
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
              {this.renderHeader()}
              {this.renderTitle()}
              {this.renderKeyword()}
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
