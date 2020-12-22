import { Button, CircularProgress, Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { adminGetListContact, adminEditCategory } from 'src/api/admin/category'
import type { IPayloadCategory } from 'src/api/types'
import { CreateButton, DialogLoading, DialogLoadingMethod, Table } from 'src/components'
import SideBarAdmin from 'src/components/admin/SideBar'
import type { IColumn } from 'src/components/custom/Table'
import { category_status } from 'src/constants'
import styles from './styles.module.css'

interface IProps {
  token?: string
}

const AdminContactList: React.FC<IProps> = (props) => {
  const columns = useMemo<Array<IColumn>>(() => {
    return [
      {
        id: 'id',
        label: 'id',
        width: 160,
      },
      {
        id: 'from_user',
        label: 'Từ người dùng',
        format: (value) => renderUser(value),
        width: 200,
      },
      {
        id: 'to_user',
        label: 'Đên người dùng',
        format: (value) => renderUser(value),
        width: 200,
      },
      {
        id: 'info',
        label: 'Thông tin chi tiết',
        format: (value) => renderInfo(value),
      },
    ]
  }, [])

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any[]>([])
  const refLoading = useRef<DialogLoadingMethod>()
  const { token } = props

  useEffect(() => {
    adminGetListContact({
      authen: token || '',
      skip: 0,
      limit: 10,
    }).then((r) => {
      if (r.success) {
        setData(r.data || [])
        setLoading(false)
      }
    })
  }, [])

  const renderSidebar = useCallback<() => React.ReactNode>(() => {
    return <SideBarAdmin />
  }, [])

  const renderContent: () => React.ReactNode = () => {
    if (loading)
      return (
        <div className="full-view-center">
          <CircularProgress size={40} />
        </div>
      )
    return (
      <div className="view-table">
        <Table data={data || []} columns={columns} />
      </div>
    )
  }

  const renderUser = (value) => {
    return <div>{value?.name}</div>
  }

  const renderInfo = (value) => {
    try {
      const dataaa = JSON.parse(value)
      return (
        <div style={{ whiteSpace: 'pre-line' }}>
          <span>Tiêu đề: {dataaa.title}</span>
          <br />
          <span>Họ tên: {dataaa.name}</span>
          <br />
          <span>Số điện thoại: {dataaa.phone}</span>
          <br />
          <span>Email: {dataaa?.email}</span>
          <br />
          <span>Thông tin liên hệ: {dataaa?.description}</span>
        </div>
      )
    } catch (error) {
      return <div>{value}</div>
    }
  }

  return (
    <Grid container>
      {renderSidebar()}
      <Grid item md={10} className="container-admin">
        <h2>Danh sách liên hệ</h2>
        {/* <CreateButton onClick={onClickCreate} /> */}
        {renderContent()}
        <DialogLoading ref={refLoading} />
      </Grid>
    </Grid>
  )
}

export default AdminContactList

const styles_object = {
  btn: { backgroundColor: 'orange', color: '#000', margin: '2px 0px' },
}
