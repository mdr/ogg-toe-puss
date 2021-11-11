import _ from 'lodash'
import { OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { ByteTableRowSpec, CellInterpretationType, ByteTable } from './ByteTableRow'

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
          interpretation: {
            type: CellInterpretationType.MULTIPLE,
            labels: _.range(4).map((i) => header.magicSignature[i]),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 1,
          interpretation: {
            type: CellInterpretationType.MULTIPLE,
            labels: _.range(4, 4 + 4).map((i) => header.magicSignature[i]),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 2,
          header: 'Vendor String Length',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.vendorStringLength.toString(),
          },
        },
      ],
    },
    ..._.chunk(header.vendorString, 4).map(
      (piece, i) =>
        ({
          cells: [
            {
              width: piece.length,
              colour: 5,
              header: i === 0 ? 'Vendor String' : undefined,
              interpretation:
                i === 0
                  ? {
                      type: CellInterpretationType.SINGLE,
                      label: header.vendorString,
                    }
                  : undefined,
            },
          ],
        } as ByteTableRowSpec)
    ),
  ]
  return <ByteTable dataWindow={header.dataWindow} showHex={showHex} rows={rowSpecs} />
}
