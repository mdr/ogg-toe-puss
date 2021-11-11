export enum CellInterpretationType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export interface ByteTableRowSpec {
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
  colour: number
}
