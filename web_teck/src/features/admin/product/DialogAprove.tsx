import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Button, Checkbox, CircularProgress } from '@material-ui/core'
import { PaperComponent } from 'src/components'
import type { IPayloadCategory, IPayloadProduct } from 'src/api/types'
import { adminAproveProduct } from 'src/api/admin/product'
import { adminGetListCategory } from 'src/api/admin/category'

interface IProps {
  token?: string | null
  onAprove?: (item: IPayloadProduct) => void
}

export interface DialogAproveMethod {
  show: (id: string) => void
  hide: () => void
}

export const DialogAprove: React.FC<IProps> = React.forwardRef<DialogAproveMethod, IProps>(
  (props: any, ref: React.Ref<DialogAproveMethod>) => {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [category, setCategory] = useState<string>()
    const [id, setId] = useState<string>()

    const [data, setData] = useState<IPayloadCategory[]>([])

    const { token, onAprove } = props

    const onClose = () => {
      if (submitLoading) return
      setOpen(false)
      setCategory(undefined)
      setSubmitLoading(false)
      setId(undefined)
    }

    useEffect(() => {
      adminGetListCategory({
        authen: token || '',
        skip: 0,
        limit: 10,
        search: [],
        sort: [{ name: 'updated_at', desc: true }],
      }).then((r) => {
        if (r.success) {
          setData(r.data || [])
          setLoading(false)
        }
      })
    }, [token])

    const onChangeCategory = (i: string) => () => {
      setCategory(i)
    }

    const onSubmit = () => {
      setSubmitLoading(true)
      adminAproveProduct({ authen: token || '', id: id as string, type: 'aprove', category }).then(
        (r) => {
          if (r.success) {
            onAprove!(r.data)
            onClose()
          }
        }
      )
    }

    React.useImperativeHandle(ref, () => ({
      show: (i) => {
        setOpen(true)
        setId(i)
      },
      hide: () => setOpen(false),
    }))

    const renderContent = () => {
      if (loading) {
        return (
          <div
            style={{
              width: 100,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CircularProgress size={60} />
          </div>
        )
      }
      return (
        <div
          style={{
            minWidth: 300,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 24px',
          }}>
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <h2 style={{ textAlign: 'center' }}>Chọn danh mục cho bài viết</h2>
          </div>
          <div>
            {data.map((i) => {
              return (
                <div
                  key={i.id}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    checked={category === i.id}
                    onChange={onChangeCategory(i.id as string)}
                  />
                  <p style={{ paddingLeft: 24 }}>{i.name}</p>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 50, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={onSubmit}
              style={{
                backgroundColor: 'orange',
                color: '#fff',
                width: 100,
                alignItems: 'center',
              }}>
              OK
            </Button>
          </div>
        </div>
      )
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        {renderContent()}
      </Dialog>
    )
  }
)
