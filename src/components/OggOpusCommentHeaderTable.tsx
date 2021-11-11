import _ from 'lodash'
import { OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { ByteTable } from './ByteTableRow'
import { ByteTableRowSpec, multipleCellInterpretation, singleCellInterpretation } from './ByteTableRowSpec'
import { arrangeCellsIntoRows } from './cellArranger'

export interface OggOpusCommentHeaderTableProps {
  header: OggOpusCommentHeader
  showHex: boolean
}

export const OggOpusCommentHeaderTable = ({ header, showHex }: OggOpusCommentHeaderTableProps) => {
  const rowSpecs: ByteTableRowSpec[] = [
    {
      cells: [
        {
          width: 4,
          colour: 1,
          header: 'Magic Signature',
          interpretation: multipleCellInterpretation(_.range(4).map((i) => header.magicSignature[i])),
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 1,
          interpretation: multipleCellInterpretation(_.range(4, 4 + 4).map((i) => header.magicSignature[i])),
        },
      ],
    },
    ...arrangeCellsIntoRows(
      [
        {
          width: 4,
          colour: 2,
          header: 'Vendor String Length',
          interpretation: singleCellInterpretation(header.vendorStringLength.toString()),
        },
        {
          width: header.vendorString.length,
          colour: 3,
          header: 'Vendor String',
          interpretation: singleCellInterpretation(header.vendorString),
        },
        {
          width: 4,
          colour: 4,
          header: 'User Comment List Length',
          interpretation: singleCellInterpretation(header.userCommentListLength.toString()),
        },
      ],
      4
    ),
  ]

  return <ByteTable dataWindow={header.dataWindow} showHex={showHex} rows={rowSpecs} />
}
