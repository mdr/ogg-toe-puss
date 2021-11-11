import _ from 'lodash'
import { OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { ByteTable } from './ByteTableRow'
import { ByteTableRowSpec, multipleCellInterpretation, singleCellInterpretation } from './ByteTableRowSpec'

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
    {
      cells: [
        {
          width: 4,
          colour: 2,
          header: 'Vendor String Length',
          interpretation: singleCellInterpretation(header.vendorStringLength.toString()),
        },
      ],
    },
    ...getVendorStringRows(header),
  ]
  return <ByteTable dataWindow={header.dataWindow} showHex={showHex} rows={rowSpecs} />
}

const getVendorStringRows = (header: OggOpusCommentHeader): ByteTableRowSpec[] => 
  _.chunk(header.vendorString, 4).map(
    (piece, i) =>
      ({
        cells: [
          {
            width: piece.length,
            colour: 5,
            header: i === 0 ? 'Vendor String' : undefined,
            interpretation: i === 0 ? singleCellInterpretation(header.vendorString) : undefined,
          },
        ],
      })
  )
