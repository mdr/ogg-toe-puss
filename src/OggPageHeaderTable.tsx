import _ from 'lodash'
import { OggPage } from './OggPage'
import { Bytes } from './types'
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

interface SegmentSizeCell {
  header: string
  hex: string
  interpretation: string
}
interface SegmentSizeRowProps {
  showHex: boolean
  startByte: Bytes
  endByte: Bytes
  cells: SegmentSizeCell[] 
}

const SegmentSizeRow = ({ showHex, startByte, endByte, cells }: SegmentSizeRowProps) => (
  <>
    <tr>
      <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
        {startByte}-{endByte}
      </th>
      {cells.map((cell, i) => (
        <td
          key={`segment-size-header-row-${i}`}
          className="byte-table__header-cell byte-table__cell-style-9 byte-table__starts-mid-table byte-table__border-right"
        >
          {cell.header}
        </td>
      ))}
    </tr>
    {showHex && (
      <tr>
        {cells.map((cell, i) => (
          <td
            key={`segment-size-hex-row-${i}`}
            className="byte-table__hex-cell byte-table__cell-style-9 byte-table__starts-mid-table byte-table__border-right"
          >
            {cell.hex}
          </td>
        ))}
      </tr>
    )}
    <tr>
      {cells.map((cell, i) => (
        <td
          key={`segment-size-interpretation-${i}`}
          className="byte-table__interpretation-cell byte-table__cell-style-9 byte-table__starts-mid-table byte-table__border-right"
        >
          {cell.interpretation}
        </td>
      ))}
    </tr>
  </>
)

export const OggPageHeaderTable = ({ page, showHex }: OggPageTableProps) => {
  return (
    <table className="ogg-page-table byte-table">
      <tbody>
        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            0-3
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-1" colSpan={4}>
            Capture Pattern
          </td>
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-1">
              {page.getCapturePatternHex(0)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-1">
              {page.getCapturePatternHex(1)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-1">
              {page.getCapturePatternHex(2)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-1">
              {page.getCapturePatternHex(3)}
            </td>
          </tr>
        )}
        <tr>
          <td className="byte-table__interpretation-cell byte-table__cell-style-1">
            {page.capturePattern[0]}
          </td>
          <td className="byte-table__interpretation-cell byte-table__cell-style-1">
            {page.capturePattern[1]}
          </td>
          <td className="byte-table__interpretation-cell byte-table__cell-style-1">
            {page.capturePattern[2]}
          </td>
          <td className="byte-table__interpretation-cell byte-table__cell-style-1">
            {page.capturePattern[3]}
          </td>
        </tr>

        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            4-7
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-2">Version</td>
          <td className="byte-table__header-cell byte-table__cell-style-3 byte-table__starts-mid-table">
            Header Type
          </td>
          <td
            className="byte-table__header-cell byte-table__cell-style-4 byte-table__starts-mid-table"
            colSpan={2}
          ></td>
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-2">{page.versionHex}</td>
            <td className="byte-table__hex-cell byte-table__cell-style-3 byte-table__starts-mid-table">
              {page.headerTypeHex}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-4 byte-table__starts-mid-table">
              {page.getGranulePositionHex(0)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(1)}
            </td>
          </tr>
        )}
        <tr>
          <td className="byte-table__interpretation-cell byte-table__cell-style-2">{page.version}</td>
          <td className="byte-table__interpretation-cell byte-table__cell-style-3 byte-table__starts-mid-table">
            {describeHeaderType(page)}
          </td>
          <td
            className="byte-table__interpretation-cell byte-table__cell-style-4 byte-table__starts-mid-table"
            colSpan={2}
          ></td>
        </tr>

        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            8-11
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-4" colSpan={4}>
            Granule Position
          </td>
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(2)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(3)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(4)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(5)}
            </td>
          </tr>
        )}
        <tr>
          <td className="byte-table__interpretation-cell byte-table__cell-style-4" colSpan={4}>
            {page.granulePosition.toString()}
          </td>
        </tr>

        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            12-15
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-4" colSpan={2}></td>
          <td
            className="byte-table__header-cell byte-table__cell-style-5 byte-table__starts-mid-table"
            colSpan={2}
          >
            Bitstream Serial Number
          </td>
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(6)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-4">
              {page.getGranulePositionHex(7)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-5 byte-table__starts-mid-table">
              {page.getBitstreamSerialNumberHex(0)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-5">
              {page.getBitstreamSerialNumberHex(1)}
            </td>
          </tr>
        )}
        <tr>
          <td className="byte-table__interpretation-cell byte-table__cell-style-4" colSpan={2}></td>
          <td
            className="byte-table__interpretation-cell byte-table__cell-style-5 byte-table__starts-mid-table"
            colSpan={2}
          >
            {page.bitstreamSerialNumber}
          </td>
        </tr>

        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            16-19
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-5" colSpan={2}></td>
          <td
            className="byte-table__header-cell byte-table__cell-style-6 byte-table__starts-mid-table"
            colSpan={2}
          >
            Page Sequence Number
          </td>
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-5">
              {page.getBitstreamSerialNumberHex(2)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-5">
              {page.getBitstreamSerialNumberHex(3)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-6 byte-table__starts-mid-table">
              {page.getPageSequenceNumberHex(0)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-6">
              {page.getPageSequenceNumberHex(1)}
            </td>
          </tr>
        )}
        <tr>
          <td
            className="byte-table__interpretation-cell byte-table__cell-style-5"
            colSpan={2}
          ></td>
          <td
            className="byte-table__interpretation-cell byte-table__cell-style-6 byte-table__starts-mid-table"
            colSpan={2}
          >
            {page.pageSequenceNumber}
          </td>
        </tr>

        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            20-23
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-6" colSpan={2}></td>
          <td
            className="byte-table__header-cell byte-table__cell-style-7 byte-table__starts-mid-table"
            colSpan={2}
          >
            CRC Checksum
          </td>
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-6">
              {page.getPageSequenceNumberHex(2)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-6">
              {page.getPageSequenceNumberHex(3)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-7 byte-table__starts-mid-table">
              {page.getCrcChecksumHex(0)}
            </td>
            <td className="byte-table__hex-cell byte-table__cell-style-7">{page.getCrcChecksumHex(1)}</td>
          </tr>
        )}
        <tr>
          <td
            className="byte-table__interpretation-cell byte-table__cell-style-6"
            colSpan={2}
          ></td>
          <td
            className="byte-table__interpretation-cell byte-table__cell-style-7 byte-table__starts-mid-table"
            colSpan={2}
          >
            {page.crcChecksum}
          </td>
        </tr>

        <tr>
          <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
            24-27
          </th>
          <td className="byte-table__header-cell byte-table__cell-style-7" colSpan={2}></td>
          <td className="byte-table__header-cell byte-table__cell-style-8 byte-table__starts-mid-table">
            Page Segments
          </td>
          {page.numberOfPageSegments > 0 && (
            <td className="byte-table__header-cell byte-table__cell-style-9 byte-table__starts-mid-table">
              Segment 1 Size
            </td>
          )}
        </tr>
        {showHex && (
          <tr>
            <td className="byte-table__hex-cell byte-table__cell-style-7">{page.getCrcChecksumHex(2)}</td>
            <td className="byte-table__hex-cell byte-table__cell-style-7">{page.getCrcChecksumHex(3)}</td>
            <td className="byte-table__hex-cell byte-table__cell-style-8 byte-table__starts-mid-table">
              {page.numberOfPageSegmentsHex}
            </td>
            {page.numberOfPageSegments > 0 && (
              <td className="byte-table__hex-cell byte-table__cell-style-9 byte-table__starts-mid-table">
                {page.getSegmentSizeHex(0)}
              </td>
            )}
          </tr>
        )}
        <tr>
          <td className="byte-table__interpretation-cell byte-table__cell-style-7" colSpan={2}></td>
          <td className="byte-table__interpretation-cell byte-table__cell-style-8 byte-table__starts-mid-table">
            {page.numberOfPageSegments}
          </td>
          {page.numberOfPageSegments > 0 && (
            <td className="byte-table__interpretation-cell byte-table__cell-style-9 byte-table__starts-mid-table">
              {page.getSegmentSize(0)}
            </td>
          )}
        </tr>
        {_.chunk(_.range(1, page.numberOfPageSegments), 4).map((segmentIndices) => {
          const cells: SegmentSizeCell[] = segmentIndices.map((segmentIndex) => ({
            header: `Segment ${segmentIndex + 1} size`,
            hex: page.getSegmentSizeHex(segmentIndex),
            interpretation: page.getSegmentSize(segmentIndex).toString(),
          }))
          const startByte = 27 + segmentIndices[0]
          const endByte = 27 + segmentIndices[segmentIndices.length - 1]
          return (
            <SegmentSizeRow
              key={`segment-size-cell-${segmentIndices[0]}`}
              showHex={showHex}
              startByte={startByte}
              endByte={endByte}
              cells={cells}
            />
          )
        })}
      </tbody>
    </table>
  )
}
