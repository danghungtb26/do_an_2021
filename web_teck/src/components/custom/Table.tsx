import {
  TableContainer,
  Table as TableCore,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import React from 'react'

interface ITableProps {
  columns: Array<Record<string, any>>
  data: Array<Record<string, any>>
  keyProps?: string
}

const Table: React.FC<ITableProps> = (props) => {
  const { columns, data = [], keyProps = 'id' } = props
  return (
    <div style={{ position: 'relative' }}>
      <TableContainer style={{ width: '100%' }}>
        <TableCore stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  id={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                    fontSize: 16,
                    maxWidth: column.maxWidth,
                  }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row[keyProps]}
                  style={{
                    backgroundColor: row.color || '#fff',
                  }}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        className="table-cell-custom"
                        style={{ wordBreak: 'break-word', fontSize: 16 }}
                        key={column.id}
                        align={column.align}>
                        {column.format ? column.format(value, row, index) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </TableCore>
      </TableContainer>
    </div>
  )
}

export default Table
