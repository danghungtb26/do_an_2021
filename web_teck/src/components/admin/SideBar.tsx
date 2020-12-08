import { Grid } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './css/SideBar.module.css'

interface IProps {}

const active = [
  {
    id: 1,
    name: 'product',
    label: 'Products',
  },
  {
    id: 2,
    name: 'category',
    label: 'Category',
  },
  {
    id: 3,
    name: 'user',
    label: 'Users',
  },
  {
    id: 4,
    name: 'contact',
    label: 'Contacts',
  },
]

const SideBarAdmin: React.FC<IProps> = () => {
  const router = useRouter()

  const current_route = router.pathname.replace('/admin', '')

  return (
    <Grid item md={2} className={styles.grid}>
      <div className={styles.top} />
      {active.map((e) => {
        return (
          <Link scroll key={e.id} href={`/admin/${e.name}`} shallow prefetch={false}>
            <div
              className={`${styles['item-side-bar']} ${
                current_route.includes(`/${e.name}`) ? styles['item-active'] : ''
              }`}>
              <p className={`${styles['txt-item-side-bar']}`}>{e.label}</p>
            </div>
          </Link>
        )
      })}

      <div
        className={`${styles['item-side-bar']} 
          
        `}>
        <p className={`${styles['txt-item-side-bar']}`}>Log out</p>
      </div>
    </Grid>
  )
}

export default SideBarAdmin
