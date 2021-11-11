import _ from 'lodash'
import { OggPage } from '../audio/OggPage'
import { ByteTable } from './ByteTableRow'
import { ByteTableRowSpec, CellInterpretationType, ByteTableCellSpec } from './ByteTableRowSpec'
export interface OggPageTableProps {
  page: OggPage
  showHex: boolean
}

const describeHeaderType = (page: OggPage): string => {
  const parts = []
  page.containsContinuedPacket && parts.push('Contains continued packet')
  page.isFirstPage && parts.push('First page')
  page.isLastPage && parts.push('Last page')
  return parts.join(', ')
}

export const OggPageHeaderTable = ({ page, showHex }: OggPageTableProps) => {
  const rowSpecs: ByteTableRowSpec[] = [
    {
      cells: [
        {
          width: 4,
          colour: 1,
          header: 'Capture Pattern',
          interpretation: {
            type: CellInterpretationType.MULTIPLE,
            labels: _.range(4).map((i) => page.capturePattern[i]),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 1,
          colour: 2,
          header: 'Version',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.version.toString(),
          },
        },
        {
          width: 1,
          colour: 3,
          header: 'Header Type',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: describeHeaderType(page),
          },
        },
        {
          width: 2,
          colour: 4,
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 4,
          header: 'Granule Position',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.granulePosition.toString(),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 2,
          colour: 4,
        },
        {
          width: 2,
          colour: 5,
          header: 'Bitstream Serial Number',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.bitstreamSerialNumber,
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 2,
          colour: 5,
        },
        {
          width: 2,
          colour: 6,
          header: 'Page Sequence Number',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.pageSequenceNumber.toString(),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 2,
          colour: 6,
        },
        {
          width: 2,
          colour: 7,
          header: 'CRC Checksum',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.crcChecksum,
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 2,
          colour: 7,
        },
        {
          width: 1,
          colour: 8,
          header: 'Page Segments',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.numberOfPageSegments.toString(),
          },
        },
        ...(page.numberOfPageSegments === 0
          ? []
          : [
              {
                width: 1,
                colour: 9,
                header: 'Segment 1 Size',
                interpretation: {
                  type: CellInterpretationType.SINGLE,
                  label: page.getSegmentSize(0).toString(),
                },
              } as ByteTableCellSpec,
            ]),
      ],
    },
    ..._.chunk(_.range(1, page.numberOfPageSegments), 4).map(
      (segmentIndices) =>
        ({
          cells: segmentIndices.map((segmentIndex) => ({
            width: 1,
            colour: 9,
            header: `Segment ${segmentIndex + 1} size`,
            interpretation: {
              type: CellInterpretationType.SINGLE,
              label: page.getSegmentSize(segmentIndex).toString(),
            },
          })),
        } as ByteTableRowSpec)
    ),
  ]
  return <ByteTable dataWindow={page.dataWindow} showHex={showHex} rows={rowSpecs} />
}
