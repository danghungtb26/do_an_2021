import { Button } from '@material-ui/core'
import React from 'react'

interface IProps {
  title?: string
  loading?: boolean
  onClick?: () => void
}

const CreateButton: React.FC<IProps> = (props) => {
  const { title, onClick } = props
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: 'orange', color: 'white', width: 120, marginTop: 12 }}>
      {title || 'Thêm mới'}
    </Button>
  )
}

export default CreateButton
