import React, { useCallback, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core'
import { adminAddCategory, adminEditCategory } from 'src/api/admin/category'

interface IProps {
  authen: string
  onCallback: (isNew: boolean, item: any) => void
}

export const PaperComponent = (props: any) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}
export interface DialogCreateMethod {
  show: (item: any) => void
  hide: () => void
}

export const DialogCreate: React.FC<IProps> = React.forwardRef<DialogCreateMethod, IProps>(
  ({ authen, onCallback }, ref: React.Ref<DialogCreateMethod>) => {
    const [open, setOpen] = useState<boolean>(false)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<number>(2)
    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    React.useImperativeHandle(ref, () => ({
      show: (item) => {
        setOpen(true)
        if (item) {
          setId(item.id)
          setTitle(item.name)
          setStatus(item.status)
          setDescription(item.description)
        }
      },
      hide: () => {
        setOpen(false)
        setId('')
        setTitle('')
        setStatus(2)
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
      )
    }, [title, setTitle])
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
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      )
    }, [description, setDescription])

    const onSubmit = () => {
      setLoading(true)
      if (id) {
        adminEditCategory({ authen, id, title, description, status })
          .then((r) => {
            if (r.success) {
              onCallback(!id, r.data)
              setOpen(false)
            }
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        adminAddCategory({ authen, title, description, status })
          .then((r) => {
            if (r.success) {
              onCallback(!id, r.data)
              setOpen(false)
            }
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }

    const renderSubmit = () => {
      return (
        <Grid container className="field-input-product-new">
          <Button
            color="secondary"
            onClick={onSubmit}
            style={{ backgroundColor: 'tomato', color: 'white' }}>
            {loading ? <CircularProgress size={24} color="primary" /> : null}
            Lưu
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
            width: 600,
            // height: 500,
            display: 'flex',
            alignItems: 'center',
            padding: 12,
            flexDirection: 'column',
          }}>
          <h2>{id ? 'Chỉnh sửa' : 'Tạo mới'}</h2>
          {renderTitle()}
          {renderDescription()}
          {renderSubmit()}
        </div>
      </Dialog>
    )
  }
)

// export const  = React.forwardRef(DialogCreateComponent)
