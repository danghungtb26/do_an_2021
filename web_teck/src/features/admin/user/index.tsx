import { Grid } from '@material-ui/core'
import React, { useMemo } from 'react'
import { Table } from 'src/components'
import type { IColumn } from 'src/components/custom/Table'

interface IProps {}

const AdminUserList: React.FC<IProps> = () => {
  const columns = useMemo<Array<IColumn>>(() => {
    return [
      {
        id: 'id',
        label: 'id',
        width: 80,
      },
      {
        id: 'avatar',
        label: 'Ảnh',
        width: 80,
      },
      {
        id: 'username',
        label: 'Tên',
        width: 200,
      },

      {
        id: 'email',
        label: 'Email',
      },
      {
        id: 'phone',
        label: 'Phone',
        width: 140,
      },
      {
        id: 'product_count',
        label: 'Số bài viết',
        width: 120,
      },
      {
        id: 'status',
        label: 'Trạng thái',
        width: 120,
      },
      {
        id: 'action',
        label: 'Actions',
        width: 160,
        align: 'center',
      },
    ]
  }, [])

  return (
    <Grid item md={10} className="container-admin">
      <h2>Danh sách danh mục</h2>
      <div className="view-table">
        <Table data={[]} columns={columns} />
      </div>
    </Grid>
  )
}

export default AdminUserList
