import { OggPage } from '../audio/OggPage'
import { Bytes } from '../util/types'
import classNames from 'classnames'
export interface OggPageTableProps {
  page: OggPage
  showHex: boolean
}

export enum CellInterpretationType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export interface ByteTableProps {
  showHex: boolean
  rows: ByteTableRowSpec[]
}

export const ByteTable = ({ showHex, rows }: ByteTableProps) => (
  <table className="byte-table">
    <tbody>
      {rows.map((row, i) => (
        <ByteTableRow key={`byte-table-row-${i}`} showHex={showHex} rowSpec={row} />
      ))}
    </tbody>
  </table>
)

export interface ByteTableRowProps {
  showHex: boolean
  rowSpec: ByteTableRowSpec
}

export const ByteTableRow = ({ showHex, rowSpec }: ByteTableRowProps) => {
  const { startByte, endByte, cells } = rowSpec
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
            cell.hex.map((hex, j) => (
              <td
                key={`byte-table-hex-row-${i}-${j}`}
                className={classNames('byte-table__hex-cell', `byte-table__cell-style-${cell.colour}`, {
                  'byte-table__border-right': j === cell.hex.length - 1,
                })}
              >
                {hex}
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
                  'byte-table__border-right': j === cell.hex.length - 1,
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

export interface ByteTableRowSpec {
  startByte: Bytes
  endByte: Bytes
  cells: ByteTableCellSpec[]
}

export interface SingleCellInterpretation {
  type: CellInterpretationType.SINGLE
  label: string
}

export interface MultipleCellInterpretation {
  type: CellInterpretationType.MULTIPLE
  labels: string[]
}

export type CellInterpretation = SingleCellInterpretation | MultipleCellInterpretation

export interface ByteTableCellSpec {
  width: number
  header?: string
  interpretation?: CellInterpretation
  hex: string[]
  colour: number
}
