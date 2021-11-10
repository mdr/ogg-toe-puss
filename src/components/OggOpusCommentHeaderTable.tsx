import _ from 'lodash'
import { OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { ByteTableRowSpec, CellInterpretationType, ByteTableRow } from './ByteTableRow'

export interface OggOpusCommentHeaderTableProps {
  header: OggOpusCommentHeader
  showHex: boolean
}

export const OggOpusCommentHeaderTable = ({ header, showHex }: OggOpusCommentHeaderTableProps) => {
  const row1Spec: ByteTableRowSpec = {
    startByte: 0,
    endByte: 3,
    cells: [
      {
        width: 4,
        colour: 1,
        header: 'Magic Signature',
        interpretation: {
          type: CellInterpretationType.MULTIPLE,
          labels: _.range(4).map((i) => header.magicSignature[i]),
        },
        hex: _.range(4).map(header.getMagicSignatureHex),
      },
    ],
  }
  const row2Spec: ByteTableRowSpec = {
    startByte: 4,
    endByte: 7,
    cells: [
      {
        width: 4,
        colour: 1,
        interpretation: {
          type: CellInterpretationType.MULTIPLE,
          labels: _.range(4, 4 + 4).map((i) => header.magicSignature[i]),
        },
        hex: _.range(4, 4 + 4).map(header.getMagicSignatureHex),
      },
    ],
  }
  const row3Spec: ByteTableRowSpec = {
    startByte: 8,
    endByte: 11,
    cells: [
      {
        width: 4,
        colour: 2,
        header: 'Vendor String Length',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.vendorStringLength.toString(),
        },
        hex: _.range(4).map(header.getVendorStringLengthHex),
      },
    ],
  }
  const vendorStringRowSpecs: ByteTableRowSpec[] = _.chunk(header.vendorString, 4).map(
    (piece, i) =>
      ({
        startByte: 12 + i * 4,
        endByte: 12 + i * 4 + 3,
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
            hex: _.range(i * 4, i * 4 + 4).map(header.getVendorStringHex),
          },
        ],
      } as ByteTableRowSpec)
  )

  return (
    <table className="comment-header-table byte-table">
      <tbody>
        <ByteTableRow showHex={showHex} rowSpec={row1Spec} />
        <ByteTableRow showHex={showHex} rowSpec={row2Spec} />
        <ByteTableRow showHex={showHex} rowSpec={row3Spec} />
        {vendorStringRowSpecs.map((spec) => (
          <ByteTableRow showHex={showHex} rowSpec={spec} />
        ))}
      </tbody>
    </table>
  )
}
