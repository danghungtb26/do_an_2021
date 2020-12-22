import { Button, CircularProgress } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { getProductListOfUser } from 'src/api'
import type { IPayloadCategory, IPayloadProduct } from 'src/api/types'
import { DialogLoading, DialogLoadingMethod, Table } from 'src/components'
import type { IColumn } from 'src/components/custom/Table'
import { AUTHEN_TOKEN_WEB_TECK, product_status_value } from 'src/constants'

interface IProps {}

const ProductList: React.FC<IProps> = () => {
  const columns = useMemo<Array<IColumn>>(() => {
    return [
      {
        id: 'id',
        label: 'id',
        width: 80,
      },
      {
        id: 'title',
        label: 'Tiêu đề',
        width: 160,
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
        id: 'react_count',
        label: 'react_count',
        minWidth: '10%',
        align: 'center',
      },
      {
        id: 'comment_count',
        label: 'comment_count',
        minWidth: '10%',
        align: 'center',
      },
      {
        id: 'created_at',
        label: 'created_at',
        minWidth: 120,
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
        format: (value: any, item: IPayloadProduct) => renderAction(value, item),
      },
    ]
  }, [])

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IPayloadProduct[]>([])
  const refLoading = useRef<DialogLoadingMethod>()
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const refHeader = useRef<any>()

  useEffect(() => {
    const authen = localStorage.getItem(AUTHEN_TOKEN_WEB_TECK)
    getProductListOfUser({
      authen: authen || '',
      skip: (page - 1) * 10,
      limit: 10,
      keyword: '',
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

  const renderStatus = (value: string) => {
    return <div>{product_status_value[Number(value) || 0]}</div>
  }

  const renderCategory = (value: IPayloadCategory) => {
    return <div>{value?.name}</div>
  }

  const onClickBtn = (item) => () => {}

  const renderAction = (_value: any, item: IPayloadProduct) => {
    return (
      <div>
        <Button onClick={onClickBtn(item)} color="inherit" style={styles_object.btn}>
          Edit
        </Button>
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
    <>
      <div ref={refHeader} />
      {renderContent()}
      {renderPage()}
      <DialogLoading ref={refLoading} />
    </>
  )
}

export default ProductList

const styles_object = {
  btn: { backgroundColor: 'orange', color: '#000', margin: '2px 0px' },
}
