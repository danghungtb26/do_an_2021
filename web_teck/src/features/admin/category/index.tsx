import { CircularProgress, Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { adminGetListCategory } from 'src/api'
import type { IPayloadCategory } from 'src/api/types'
import { CreateButton, DialogLoading, DialogLoadingMethod, Table } from 'src/components'
import SideBarAdmin from 'src/components/admin/SideBar'
import type { IColumn } from 'src/components/custom/Table'

interface IProps {
  token?: string
}

const AdminCategoryList: React.FC<IProps> = (props) => {
  const onClickCreate: () => void = () => {}

  const columns = useMemo<Array<IColumn>>(() => {
    return [
      {
        id: 'id',
        label: 'id',
        width: 160,
      },
      {
        id: 'name',
        label: 'Tên',
      },
      {
        id: 'status',
        label: 'Trạng thái',
        width: 140,
        align: 'center',
      },
      {
        id: 'product_count',
        label: 'Số bài viết',
        width: 140,
        align: 'center',
      },
      {
        id: 'action',
        label: 'Actions',
        width: 160,
        align: 'center',
      },
    ]
  }, [])

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IPayloadCategory[]>([])
  const refLoading = useRef<DialogLoadingMethod>()
  const { token } = props

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

  return (
    <Grid container>
      {renderSidebar()}
      <Grid item md={10} className="container-admin">
        <h2>Danh sách danh mục</h2>
        <CreateButton onClick={onClickCreate} />
        {renderContent()}
        <DialogLoading ref={refLoading} />
      </Grid>
    </Grid>
  )
}

export default AdminCategoryList
