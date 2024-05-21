export enum CellInterpretationType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
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

export const singleCellInterpretation = (label: string): SingleCellInterpretation => ({
  type: CellInterpretationType.SINGLE,
  label,
})

export const multipleCellInterpretation = (labels: string[]): MultipleCellInterpretation => ({
  type: CellInterpretationType.MULTIPLE,
  labels,
})

export interface ByteTableRowSpec {
  cells: ByteTableCellSpec[]
}

export interface ByteTableCellSpec {
  width: number
  header?: string
  interpretation?: CellInterpretation
  colour: number
}
