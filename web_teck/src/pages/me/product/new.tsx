/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, CardMedia, CircularProgress, Container, Grid, TextField } from '@material-ui/core'
import Router from 'next/router'
import React from 'react'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'
import { addProduct, uploadImage } from 'src/api'

import { Editor, Footer, Navbar } from 'src/components'
import { resizeImage } from 'src/commons'
import Header from 'src/components/Header/Header'

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
  avatar: string
  attachment: Array<string>
}

class NewProductPage extends React.Component<INewProductPageProps, INewProductPageState> {
  upload: boolean = false

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
      avatar: '',
      attachment: [],
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
    if (this.upload) return
    const {
      title,
      keyword,
      sortDescription,
      description,
      budget,
      deployment_time,
      attachment,
    } = this.state
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    if (!title || !sortDescription || !description) return
    const param = {
      authen: authen || '',
      title,
      keyword,
      sort_description: sortDescription,
      description,
      budget,
      deployment_time,
      attachment,
    }
    console.log('🚀 ~ file: new.tsx ~ line 102 ~ NewProductPage ~ addProduct ~ param', param)

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

  onChangeImage = (event) => {
    const { files } = event.nativeEvent.target
    const file = files[0]
    if (file) {
      resizeImage(file).then((result) => {
        this.upload = true
        uploadImage(file).then((r) => {
          this.setState((s) => ({ attachment: [...s.attachment, r.data.id] }))
          this.upload = false
        })
        const { errorImage, image } = result
        if (!errorImage) {
          this.setState({
            avatar: image || '',
          })
          // this.fileAvatar = file
        }
      })
    }
  }

  renderMedia = () => {
    const { avatar } = this.state
    return (
      <Grid container className="field-input-product-new">
        <Grid item md={12}>
          <div className="txt-title-key-product-new">Ảnh *</div>
        </Grid>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={this.onChangeImage}
        />
        <Grid container>
          <CardMedia image={avatar} style={{ width: 200, height: 150 }} />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
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
            {this.renderTitle()}
            {this.renderKeyword()}
            {this.renderBudget()}
            {this.renderDevelopTime()}
            {this.renderSortDescription()}
            {this.renderMedia()}
            {this.renderDescription()}
            {this.renderSubmit()}
          </Container>
        </div>
      </>
    )
  }
}

export default NewProductPage
