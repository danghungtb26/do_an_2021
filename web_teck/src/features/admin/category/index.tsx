import { Button, CircularProgress, Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { adminGetListCategory, adminEditCategory } from 'src/api/admin/category'
import type { IPayloadCategory } from 'src/api/types'
import { CreateButton, DialogLoading, DialogLoadingMethod, Table } from 'src/components'
import SideBarAdmin from 'src/components/admin/SideBar'
import type { IColumn } from 'src/components/custom/Table'
import { category_status } from 'src/constants'
import { DialogCreate } from './DialogCreate'
import styles from './styles.module.css'

interface IProps {
  token?: string
}

const AdminCategoryList: React.FC<IProps> = (props) => {
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
        format: (value) => <span>{category_status[value]}</span>,
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
        format: (value, item) => renderAction(item),
      },
    ]
  }, [])

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IPayloadCategory[]>([])
  const refLoading = useRef<DialogLoadingMethod>()
  const refCreate = useRef<any>()
  const { token } = props

  const onClickCreate: () => void = () => {
    refCreate.current?.show()
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
  }, [])

  const renderSidebar = useCallback<() => React.ReactNode>(() => {
    return <SideBarAdmin />
  }, [])

  const onClickBtn = (type, item) => () => {
    console.log('🚀 ~ file: index.tsx ~ line 78 ~ onClickBtn ~ type', type)

    switch (type) {
      case 'active':
        refLoading.current?.show()
        adminEditCategory({ authen: token || '', ...item, status: 1 })
          .then((r) => {
            console.log('🚀 ~ file: index.tsx ~ line 84 ~ .then ~ r', r)
            if (r.success) {
              setData((s: IPayloadCategory[]) => {
                return s.map((i: IPayloadCategory) => {
                  if (i.id === r.data?.id) return r.data as IPayloadCategory
                  return i
                })
              })
            }
          })
          .finally(() => {
            refLoading.current?.hide()
          })
        break

      case 'inactive':
        refLoading.current?.show()
        adminEditCategory({ authen: token || '', ...item, status: 0 })
          .then((r) => {
            if (r.success) {
              console.log('🚀 ~ file: index.tsx ~ line 104 ~ .then ~ r', r)
              setData((s: IPayloadCategory[]) => {
                return s.map((i: IPayloadCategory) => {
                  if (i.id === r.data?.id) return r.data as IPayloadCategory
                  return i
                })
              })
            }
          })
          .finally(() => {
            refLoading.current?.hide()
          })
        break
      case 'edit':
        refCreate.current?.show(item)
        break

      default:
        break
    }
  }

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

  const renderAction = (item) => {
    return (
      <div className={`${styles['view-actions']}`}>
        {item.status === 1 ? (
          <Button onClick={onClickBtn('inactive', item)} color="inherit" style={styles_object.btn}>
            Inactive
          </Button>
        ) : null}
        {item.status === 0 ? (
          <Button onClick={onClickBtn('active', item)} color="inherit" style={styles_object.btn}>
            active
          </Button>
        ) : null}
        <Button onClick={onClickBtn('edit', item)} color="inherit" style={styles_object.btn}>
          edit
        </Button>
      </div>
    )
  }

  const onCallBack = (check, item) => {
    if (!check) {
      setData((s: IPayloadCategory[]) => {
        return s.map((i: IPayloadCategory) => {
          if (i.id === item?.id) return item as IPayloadCategory
          return i
        })
      })
    } else {
      setData((s) => [item, ...s])
    }
  }

  return (
    <Grid container>
      {renderSidebar()}
      <Grid item md={10} className="container-admin">
        <h2>Danh sách danh mục</h2>
        <CreateButton onClick={onClickCreate} />
        {renderContent()}
        <DialogCreate authen={token || ''} ref={refCreate} onCallback={onCallBack} />
        <DialogLoading ref={refLoading} />
      </Grid>
    </Grid>
  )
}

export default AdminCategoryList

const styles_object = {
  btn: { backgroundColor: 'orange', color: '#000', margin: '2px 0px' },
}
