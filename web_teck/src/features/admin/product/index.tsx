import { Button, CircularProgress, Grid, Switch } from '@material-ui/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DialogLoading, DialogLoadingMethod, Table } from 'src/components'
import {
  adminAproveProduct,
  adminGetListProduct,
  adminActiveProduct,
  adminCheckBannerProduct,
} from 'src/api/admin/product'
import type { IColumn } from 'src/components/custom/Table'
import type { IPayloadCategory, IPayloadProduct, IPayloadUser } from 'src/api/types'
import { active_type, product_status, product_status_value } from 'src/constants'
import { Pagination } from '@material-ui/lab'
import styles from './styles.module.css'
import { DialogAprove, DialogAproveMethod } from './DialogAprove'

interface IProps {
  token?: string | null
}

const AdminProductList: React.FC<IProps> = (props) => {
  const columns = useMemo<Array<IColumn>>(() => {
    return [
      {
        id: 'id',
        label: 'id',
        width: 80,
        // format: (value: any) => renderOwner(value),
      },
      {
        id: 'owner',
        label: 'Người sở hữu',
        width: 200,
        format: (value: any) => renderOwner(value),
      },
      {
        id: 'title',
        label: 'Tiêu đề',
        width: 160,
        // format: (value: any) => renderOwner(value),
      },
      {
        id: 'category',
        label: 'Danh mục',
        width: 160,
        format: (value: IPayloadCategory) => renderCategory(value),
      },
      // {
      //   id: 'sort_description',
      //   label: 'Mô tả ngắn',
      //   format: (value: any) => renderSortDescription(value),
      // },
      {
        id: 'high_light',
        label: 'banner',
        width: 100,
        align: 'center',
        format: (value: boolean, item: IPayloadProduct) => renderSwitchBanner(value, item),
      },
      {
        id: 'status',
        label: 'Trạng thái',
        width: 140,
        align: 'center',
        format: (value: any) => renderStatus(value),
      },
      {
        id: 'action',
        label: 'Actions',
        width: 100,
        align: 'center',
        format: (value: any, item: IPayloadProduct, index: number) =>
          renderAction(value, item, index),
      },
    ]
  }, [])

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IPayloadProduct[]>([])
  const refLoading = useRef<DialogLoadingMethod>()
  const refAprove = useRef<DialogAproveMethod>()
  const refHeader = useRef<any>()
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const { token } = props

  // const router = useRouter()

  useEffect(() => {
    adminGetListProduct({
      authen: token || '',
      skip: (page - 1) * 10,
      limit: 10,
      keyword: '',
      sort: [{ name: 'updated_at', desc: true }],
    })
      .then((r) => {
        if (r.success) {
          setData(r.data || [])
          setCount(r.count as number)
          setLoading(false)
        }
      })
      .finally(() => {
        refLoading.current?.hide()
        refHeader.current?.scrollIntoView()
      })
  }, [page])

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

  const renderOwner = (value: IPayloadUser) => {
    return <div>{value.name}</div>
  }

  const renderCategory = (value: IPayloadCategory) => {
    return <div>{value?.name}</div>
  }

  // const renderSortDescription = (value: any) => {
  //   return <div className={`three-dot three-line ${styles['txt-sort-description']}`}>{value}</div>
  // }

  const handleChange = (value: boolean, item: IPayloadProduct) => () => {
    refLoading.current?.show()
    adminCheckBannerProduct({ authen: token || '', id: item.id as string, high_light: value })
      .then((r) => {
        if (r.success) {
          setData((s: IPayloadProduct[]) => {
            return s.map((i: IPayloadProduct) => {
              if (i.id === r.data?.id) return r.data as IPayloadProduct
              return i
            })
          })
        }
      })
      .finally(() => {
        refLoading.current?.hide()
      })
  }

  const renderSwitchBanner = (value: boolean, item: IPayloadProduct) => {
    return (
      <Switch
        checked={value}
        onChange={handleChange(!value, item)}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    )
  }

  const renderStatus = (value: string) => {
    return <div>{product_status_value[Number(value) || 0]}</div>
  }

  const onAprove = (d: IPayloadProduct) => {
    setData((s: IPayloadProduct[]) => {
      return s.map((i: IPayloadProduct) => {
        if (i.id === d?.id) return d as IPayloadProduct
        return i
      })
    })
  }

  const onClickBtn = (type: string, item: IPayloadProduct, _index?: number) => async () => {
    switch (type) {
      case active_type.aprove: {
        refAprove.current?.show(item.id as string)
        break
      }
      case active_type.reject: {
        refLoading.current?.show()
        adminAproveProduct({ authen: token || '', id: item.id as string, type: 'reject' })
          .then((r) => {
            if (r.success) {
              setData((s: IPayloadProduct[]) => {
                return s.map((i: IPayloadProduct) => {
                  if (i.id === r.data?.id) return r.data as IPayloadProduct
                  return i
                })
              })
            }
          })
          .finally(() => {
            refLoading.current?.hide()
          })
        break
      }
      case active_type.inactive: {
        refLoading.current?.show()
        adminActiveProduct({ authen: token || '', id: item.id as string, type: 'inactive' })
          .then((r) => {
            if (r.success) {
              setData((s: IPayloadProduct[]) => {
                return s.map((i: IPayloadProduct) => {
                  if (i.id === r.data?.id) return r.data as IPayloadProduct
                  return i
                })
              })
            }
          })
          .finally(() => {
            refLoading.current?.hide()
          })

        break
      }
      case active_type.reactive: {
        refLoading.current?.show()
        adminActiveProduct({ authen: token || '', id: item.id as string, type: 'active' })
          .then((r) => {
            if (r.success) {
              setData((s: IPayloadProduct[]) => {
                return s.map((i: IPayloadProduct) => {
                  if (i.id === r.data?.id) return r.data as IPayloadProduct
                  return i
                })
              })
            }
          })
          .finally(() => {
            refLoading.current?.hide()
          })
        break
      }

      default:
        break
    }
  }

  const renderAction = (_value: any, item: IPayloadProduct, index: number) => {
    return (
      <div className={`${styles['view-actions']}`}>
        {item?.status === product_status.new ? (
          <>
            <Button
              onClick={onClickBtn(active_type.aprove, item, index)}
              color="inherit"
              style={styles_object.btn}>
              Aprove
            </Button>
            <Button
              onClick={onClickBtn(active_type.reject, item, index)}
              color="inherit"
              style={styles_object.btn}>
              Reject
            </Button>
          </>
        ) : null}
        {item?.status === product_status.pending ? (
          <>
            <Button
              onClick={onClickBtn(active_type.inactive, item, index)}
              color="inherit"
              style={styles_object.btn}>
              Inactive
            </Button>
          </>
        ) : null}
        {item?.status === product_status.blocked ? (
          <>
            <Button
              onClick={onClickBtn(active_type.reactive, item, index)}
              color="inherit"
              style={styles_object.btn}>
              Active
            </Button>
          </>
        ) : null}
        {item?.status === product_status.reported ? (
          <>
            <Button
              onClick={onClickBtn(active_type.inactive, item, index)}
              color="inherit"
              style={styles_object.btn}>
              Inactive
            </Button>
            <Button
              onClick={onClickBtn(active_type.reactive, item, index)}
              color="inherit"
              style={styles_object.btn}>
              reactive
            </Button>
          </>
        ) : null}
        {item?.status === product_status.reject ? (
          <Button
            onClick={onClickBtn(active_type.reactive, item, index)}
            color="inherit"
            style={styles_object.btn}>
            reactive
          </Button>
        ) : null}
      </div>
    )
  }

  const onChangePage: (_: any, page2: number) => void = (_, page2) => {
    refLoading.current?.show()
    setPage(page2)
    // router.push(
    //   {
    //     pathname: `/admin/product`,
    //     query: {
    //       page: page2,
    //     },
    //   },
    //   undefined,
    //   {
    //     scroll: true,
    //   }
    // )
  }

  const renderPage = React.useCallback(() => {
    if (count <= 10) return null
    return (
      <div className="view-pagination">
        <Pagination
          onChange={onChangePage}
          count={Math.ceil(count / 10)}
          defaultValue={page}
          variant="outlined"
          color="secondary"
        />
      </div>
    )
  }, [count, page])

  return (
    <>
      <div ref={refHeader} />
      <Grid item md={10} className="container-admin">
        <h2>Danh sách bài viết</h2>
        {renderContent()}
        {renderPage()}
      </Grid>

      <DialogLoading ref={refLoading} />
      <DialogAprove onAprove={onAprove} token={token} ref={refAprove} />
    </>
  )
}

export default AdminProductList

const styles_object = {
  btn: { backgroundColor: 'orange', color: '#000', margin: '2px 0px' },
}
