import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import { CircularProgress } from '@material-ui/core'

interface IProps {}

export const PaperComponent = (props: any) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}
export interface DialogLoadingMethod {
  show: () => void
  hide: () => void
}

export const DialogLoading: React.FC<IProps> = React.forwardRef<DialogLoadingMethod, IProps>(
  (_a: any, ref: React.Ref<DialogLoadingMethod>) => {
    const [open, setOpen] = useState<boolean>(false)

    React.useImperativeHandle(ref, () => ({
      show: () => {
        setOpen(true)
      },
      hide: () => setOpen(false),
    }))

    return (
      <Dialog open={open} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
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
      </Dialog>
    )
  }
)

// export const  = React.forwardRef(DialogLoadingComponent)
