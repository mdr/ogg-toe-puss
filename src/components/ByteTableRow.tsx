import { OggPage } from '../audio/OggPage'
import classNames from 'classnames'
import _ from 'lodash'
import { DataWindow } from '../util/DataWindow'
import { asHexPair } from '../util/hexUtils'
import { ByteTableRowSpec, CellInterpretationType } from './ByteTableRowSpec'
export interface OggPageTableProps {
  page: OggPage
  showHex: boolean
}

export interface ByteTableProps {
  showHex: boolean
  rows: ByteTableRowSpec[]
  dataWindow: DataWindow
}

export const ByteTable = ({ dataWindow, showHex, rows }: ByteTableProps) => (
  <table className="byte-table">
    <tbody>
      {rows.map((row, i) => {
        const startByte = i * 4
        const endByte = startByte + _.sumBy(row.cells, cell => cell.width) - 1
        const hex = _.range(startByte, endByte + 1).map(byte => asHexPair(dataWindow.getByte(byte)))
        return (
          <ByteTableRow key={`byte-table-row-${i}`} showHex={showHex} rowSpec={row} startByte={startByte} endByte={endByte} hex={hex} />
        )
      })}
    </tbody>
  </table>
)

export interface ByteTableRowProps {
  startByte: number
  endByte: number
  showHex: boolean
  rowSpec: ByteTableRowSpec
  hex: string[]
}

export const ByteTableRow = ({ startByte, endByte, showHex, rowSpec, hex }: ByteTableRowProps) => {
  const { cells } = rowSpec
  const getHex =  (i: number, j: number): string => 
    hex[_.sumBy(_.take(cells, i), cell => cell.width) + j]
  return (
    <>
      <tr>
        <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          {startByte}-{endByte}
        </th>
        {cells.map((cell, i) => (
          <td
            key={`byte-table-header-row-${i}`}
            className={`byte-table__header-cell byte-table__cell-style-${cell.colour} byte-table__border-right`}
            colSpan={cell.width}
          >
            {cell.header ?? <>&nbsp;</>}
          </td>
        ))}
      </tr>
      {showHex && (
        <tr>
          {cells.map((cell, i) =>
            _.range(cell.width).map(j => (
              <td
                key={`byte-table-hex-row-${i}-${j}`}
                className={classNames('byte-table__hex-cell', `byte-table__cell-style-${cell.colour}`, {
                  'byte-table__border-right': j === cell.width - 1,
                })}
              >
                {getHex(i, j)}
              </td>
            ))
          )}
        </tr>
      )}
      <tr className="byte-table-row3">
        {cells.map((cell, i) =>
          cell.interpretation?.type === CellInterpretationType.MULTIPLE ? (
            cell.interpretation.labels.map((label, j) => (
              <td
                key={`byte-table-interpretation-${i}-${j}`}
                className={classNames('byte-table__interpretation-cell', `byte-table__cell-style-${cell.colour}`, {
                  'byte-table__border-right': j === cell.width - 1,
                })}
              >
                {label}
              </td>
            ))
          ) : (
            <td
              key={`byte-table-interpretation-${i}`}
              className={`byte-table__interpretation-cell byte-table__cell-style-${cell.colour} byte-table__border-right`}
              colSpan={cell.width}
            >
              {cell.interpretation?.label ?? <>&nbsp;</>}
            </td>
          )
        )}
      </tr>
    </>
  )
}
