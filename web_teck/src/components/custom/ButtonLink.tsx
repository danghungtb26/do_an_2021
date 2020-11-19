import { LinkProps } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

interface IButtonLinkProps {
  title: string
  onClick?: () => void
}

const ButtonLink: React.FC<IButtonLinkProps & LinkProps> = ({
  href,
  title,
  onClick,
  ...restProps
}) => {
  return (
    <Link prefetch={false} href={href} {...restProps}>
      <div className="btn-edit-profile">{title}</div>
    </Link>
  )
}

export default ButtonLink
