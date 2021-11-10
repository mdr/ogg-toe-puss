import _ from 'lodash'
import { OggPage } from '../audio/OggPage'
import { ByteTableRowSpec, CellInterpretationType, ByteTableCellSpec, ByteTableRow, ByteTable } from './ByteTableRow'
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
      startByte: 0,
      endByte: 3,
      cells: [
        {
          width: 4,
          colour: 1,
          header: 'Capture Pattern',
          interpretation: {
            type: CellInterpretationType.MULTIPLE,
            labels: _.range(4).map((i) => page.capturePattern[i]),
          },
          hex: _.range(4).map(page.getCapturePatternHex),
        },
      ],
    },
    {
      startByte: 4,
      endByte: 7,
      cells: [
        {
          width: 1,
          colour: 2,
          header: 'Version',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.version.toString(),
          },
          hex: [page.versionHex],
        },
        {
          width: 1,
          colour: 3,
          header: 'Header Type',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: describeHeaderType(page),
          },
          hex: [page.headerTypeHex],
        },
        {
          width: 2,
          colour: 4,
          hex: _.range(2).map(page.getGranulePositionHex),
        },
      ],
    },
    {
      startByte: 8,
      endByte: 11,
      cells: [
        {
          width: 4,
          colour: 4,
          header: 'Granule Position',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.granulePosition.toString(),
          },
          hex: _.range(2, 2 + 4).map(page.getGranulePositionHex),
        },
      ],
    },
    {
      startByte: 12,
      endByte: 15,
      cells: [
        {
          width: 2,
          colour: 4,
          hex: _.range(6, 6 + 2).map(page.getGranulePositionHex),
        },
        {
          width: 2,
          colour: 5,
          header: 'Bitstream Serial Number',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.bitstreamSerialNumber,
          },
          hex: _.range(2).map(page.getBitstreamSerialNumberHex),
        },
      ],
    },
    {
      startByte: 16,
      endByte: 19,
      cells: [
        {
          width: 2,
          colour: 5,
          hex: _.range(2, 2 + 2).map(page.getBitstreamSerialNumberHex),
        },
        {
          width: 2,
          colour: 6,
          header: 'Page Sequence Number',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.pageSequenceNumber.toString(),
          },
          hex: _.range(2).map(page.getPageSequenceNumberHex),
        },
      ],
    },
    {
      startByte: 20,
      endByte: 23,
      cells: [
        {
          width: 2,
          colour: 6,
          hex: _.range(2, 2 + 2).map(page.getPageSequenceNumberHex),
        },
        {
          width: 2,
          colour: 7,
          header: 'CRC Checksum',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.crcChecksum,
          },
          hex: _.range(2).map(page.getCrcChecksumHex),
        },
      ],
    },
    {
      startByte: 24,
      endByte: 27,
      cells: [
        {
          width: 2,
          colour: 7,
          hex: _.range(2, 2 + 2).map(page.getCrcChecksumHex),
        },
        {
          width: 1,
          colour: 8,
          header: 'Page Segments',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: page.numberOfPageSegments.toString(),
          },
          hex: [page.numberOfPageSegmentsHex],
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
                hex: [page.getSegmentSizeHex(0)],
              } as ByteTableCellSpec,
            ]),
      ],
    },
    ..._.chunk(_.range(1, page.numberOfPageSegments), 4).map(
      (segmentIndices) =>
        ({
          startByte: 27 + segmentIndices[0],
          endByte: 27 + segmentIndices[segmentIndices.length - 1],
          cells: segmentIndices.map((segmentIndex) => ({
            width: 1,
            colour: 9,
            header: `Segment ${segmentIndex + 1} size`,
            hex: [page.getSegmentSizeHex(segmentIndex)],
            interpretation: {
              type: CellInterpretationType.SINGLE,
              label: page.getSegmentSize(segmentIndex).toString(),
            },
          })),
        } as ByteTableRowSpec)
    ),
  ]
  return <ByteTable showHex={showHex} rows={rowSpecs} />
}