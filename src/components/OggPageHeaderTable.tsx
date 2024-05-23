import _ from 'lodash'
import { OggPage } from '../audio/OggPage'
import { ByteTable } from './ByteTableRow'
import {
  ByteTableCellSpec,
  ByteTableRowSpec,
  multipleCellInterpretation,
  singleCellInterpretation,
} from './ByteTableRowSpec'

export interface OggPageTableProps {
  page: OggPage
}

const describeHeaderType = (page: OggPage): string => {
  const parts = []
  page.containsContinuedPacket && parts.push('Contains continued packet')
  page.isFirstPage && parts.push('First page')
  page.isLastPage && parts.push('Last page')
  return parts.join(', ')
}

export const OggPageHeaderTable = ({ page }: OggPageTableProps) => {
  const rowSpecs: ByteTableRowSpec[] = [
    {
      cells: [
        {
          width: 4,
          colour: 1,
          header: 'Capture Pattern',
          interpretation: multipleCellInterpretation(_.range(4).map((i) => page.capturePattern[i])),
        },
      ],
    },
    {
      cells: [
        {
          width: 1,
          colour: 2,
          header: 'Version',
          interpretation: singleCellInterpretation(page.version.toString()),
        },
        {
          width: 1,
          colour: 3,
          header: 'Header Type',
          interpretation: singleCellInterpretation(describeHeaderType(page)),
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
          interpretation: singleCellInterpretation(page.granulePosition.toString()),
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
          interpretation: singleCellInterpretation(page.bitstreamSerialNumber),
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
          interpretation: singleCellInterpretation(page.pageSequenceNumber.toString()),
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
          interpretation: singleCellInterpretation(page.crcChecksum),
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
          interpretation: singleCellInterpretation(page.numberOfPageSegments.toString()),
        },
        ...(page.numberOfPageSegments === 0
          ? []
          : [
              {
                width: 1,
                colour: 9,
                header: 'Segment 1 Size',
                interpretation: singleCellInterpretation(page.getSegmentSize(0).toString()),
              } as ByteTableCellSpec,
            ]),
      ],
    },
    ...getPageSegmentLengthRows(page),
  ]
  return <ByteTable dataWindow={page.dataWindow} rows={rowSpecs} />
}

const getPageSegmentLengthRows = (page: OggPage): ByteTableRowSpec[] =>
  _.chunk(_.range(1, page.numberOfPageSegments), 4).map((segmentIndices) => ({
    cells: segmentIndices.map((segmentIndex) => ({
      width: 1,
      colour: 9,
      header: `Segment ${segmentIndex + 1} size`,
      interpretation: singleCellInterpretation(page.getSegmentSize(segmentIndex).toString()),
    })),
  }))
