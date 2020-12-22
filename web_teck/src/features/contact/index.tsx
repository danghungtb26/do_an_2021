import React, { useCallback, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core'
import { send_contact } from 'src/api'
import { AUTHEN_TOKEN_WEB_TECK } from 'src/constants'

interface IProps {
  user: string
  product: string
}

export const PaperComponent = (props: any) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}
export interface DialogContactMethod {
  show: (item: any) => void
  hide: () => void
}

export const DialogContact: React.FC<IProps> = React.forwardRef<DialogContactMethod, IProps>(
  ({ user, product }, ref: React.Ref<DialogContactMethod>) => {
    const [open, setOpen] = useState<boolean>(false)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    React.useImperativeHandle(ref, () => ({
      show: (item) => {
        setOpen(true)
        if (item) {
          setId(item)
        }
      },
      hide: () => {
        setOpen(false)
        setId('')
        setTitle('')
        setDescription('')
      },
    }))

    const renderTitle = useCallback(() => {
      return (
        <Grid container className="field-input-product-new">
          <Grid item md={12}>
            <div className="txt-title-key-product-new">Tiêu đề</div>
          </Grid>

          <TextField
            variant="outlined"
            fullWidth
            value={title}
            size="small"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
      )
    }, [title, setTitle])
    const renderName = useCallback(() => {
      return (
        <Grid container className="field-input-product-new">
          <Grid item md={12}>
            <div className="txt-title-key-product-new">Họ và tên</div>
          </Grid>

          <TextField
            variant="outlined"
            fullWidth
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
      )
    }, [name, setName])
    const renderEmail = useCallback(() => {
      return (
        <Grid container className="field-input-product-new">
          <Grid item md={12}>
            <div className="txt-title-key-product-new">Email</div>
          </Grid>

          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      )
    }, [email, setEmail])
    const renderPhone = useCallback(() => {
      return (
        <Grid container className="field-input-product-new">
          <Grid item md={12}>
            <div className="txt-title-key-product-new">Số điện thoại</div>
          </Grid>

          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          />
        </Grid>
      )
    }, [phone, setPhone])
    const renderDescription = useCallback(() => {
      return (
        <Grid container className="field-input-product-new">
          <Grid item md={12}>
            <div className="txt-title-key-product-new">Mô tả</div>
          </Grid>

          <TextField
            variant="outlined"
            fullWidth
            multiline
            size="small"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      )
    }, [description, setDescription])

    const onSubmit = () => {
      setLoading(true)
      send_contact({
        authen: localStorage.getItem(AUTHEN_TOKEN_WEB_TECK) || '',
        user,
        product,
        info: JSON.stringify({ title, name, phone, email, description }),
      }).then((r) => {
        if (r.success) {
          setLoading(false)
          setTitle('')
          setDescription('')
          setEmail('')
          setPhone('')
          setOpen(false)
        }
      })
    }

    const renderSubmit = () => {
      return (
        <Grid container className="field-input-product-new">
          <Button
            color="secondary"
            onClick={onSubmit}
            style={{ backgroundColor: 'tomato', color: 'white' }}>
            {loading ? <CircularProgress size={24} color="primary" /> : null}
            Gửi thông tin
          </Button>
        </Grid>
      )
    }

    return (
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <div
          style={{
            width: 550,
            // height: 500,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: 24,
            paddingBottom: 24,
          }}>
          <h1>Liên hệ</h1>
          <div style={{ width: '80%' }}>
            {renderTitle()}
            {renderName()}
            {renderEmail()}
            {renderPhone()}
            {renderDescription()}
            {renderSubmit()}
          </div>
        </div>
      </Dialog>
    )
  }
)

// export const  = React.forwardRef(DialogContactComponent)
