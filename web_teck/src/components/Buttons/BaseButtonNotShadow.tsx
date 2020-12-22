import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import React from 'react'

interface IProps extends ButtonProps {
  backgroundColor?: string
  top?: number | string
  shadowColor?: string
}

const useStyles = makeStyles({
  root: {
    borderRadius: 6,
    backgroundColor: '#F7941D',
    border: 0,
    color: 'white',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px',
    textTransform: 'capitalize',
    transition: 'all 0.3s ease 0s',
    fontSize: 15,
    fontWeight: 700,
    appearance: 'none',
    display: 'flex',
    '-webkit-box-align': 'center',
    'align-items': 'center',
    '-webkit-box-pack': 'center',
    'justify-content': 'center',
    'flex-shrink': 0,
    'text-align': 'center',
    'text-decoration': 'none',
    '&:hover': {
      backgroundColor: '#F7941D',
    },
  },
})

const BaseButtonNotShadow: React.FC<IProps> = ({ backgroundColor, shadowColor, top, ...props }) => {
  const classes = useStyles()
  return (
    <Button
      classes={{ root: classes.root }}
      style={
        typeof backgroundColor === 'string'
          ? {
              background: backgroundColor,
              marginTop: top ?? 0,
            }
          : { marginTop: top ?? 0 }
      }
      {...props}
    />
  )
}
export default BaseButtonNotShadow
