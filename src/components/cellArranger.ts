import { ByteTableCellSpec, ByteTableRowSpec } from './ByteTableRowSpec'
import _ from 'lodash'

export const arrangeCellsIntoRows = (cells: ByteTableCellSpec[], tableWidth: number): ByteTableRowSpec[] => {
  const rows: ByteTableRowSpec[] = []
  const cellsInCurrentRow: ByteTableCellSpec[] = []
  const spaceUsedInCurrentRow = () => _.sumBy(cellsInCurrentRow, (cell) => cell.width)
  for (const cell of cells) {
    const spaceLeftInCurrentRow = tableWidth - spaceUsedInCurrentRow()
    if (cell.width <= spaceLeftInCurrentRow) {
      // Can fit in the current row
      cellsInCurrentRow.push(cell)
      if (spaceUsedInCurrentRow() === tableWidth) {
        rows.push({ cells: [...cellsInCurrentRow] })
        cellsInCurrentRow.length = 0
      }
    } else {
      // Going to have to wrap

      // Initial cell to finish off current row:
      const initialCell: ByteTableCellSpec = {
        colour: cell.colour,
        width: spaceLeftInCurrentRow,
        header: cell.header,
        interpretation: cell.interpretation,
      }
      cellsInCurrentRow.push(initialCell)
      rows.push({ cells: [...cellsInCurrentRow] })
      cellsInCurrentRow.length = 0

      // Full rows:
      const restWidth = cell.width - initialCell.width
      const numberOfFullRows = Math.floor(restWidth / tableWidth)
      const fullRows = _.range(numberOfFullRows).map<ByteTableRowSpec>((_) => ({
        cells: [
          {
            colour: cell.colour,
            width: tableWidth,
          },
        ],
      }))
      rows.push(...fullRows)

      // Final cell if needed:
      const finalCellWidth = restWidth % tableWidth
      if (finalCellWidth > 0) {
        const finalCell: ByteTableCellSpec = {
          colour: cell.colour,
          width: finalCellWidth,
        }
        cellsInCurrentRow.push(finalCell)
      }
    }
  }

  // Add an uncompleted row if needed
  if (cellsInCurrentRow.length > 0) {
    rows.push({ cells: [...cellsInCurrentRow] })
    cellsInCurrentRow.length = 0
  }
  return rows
}
