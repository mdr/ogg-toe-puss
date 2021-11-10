import React, { useState } from 'react'

import './App.scss'
import { OggPage } from '../audio/OggPage'
import { OggPageHeaderTable } from './OggPageHeaderTable'
import _ from 'lodash'
import { useShowHex } from './showHexHook'
import { Option } from '../util/util'
import { Bytes } from '../util/types'
export interface OggPagesTabProps {
  readonly oggPages: OggPage[]
}

export const OggPagesTab = ({ oggPages }: OggPagesTabProps) => {
  const { showHex } = useShowHex()
  const [pageNumber, setPageNumber] = useState<number>(0)
  const oggPage = pageNumber < oggPages.length ? oggPages[pageNumber] : undefined
  return (
    <div className="ogg-pages-tab">
      <h1>
        Ogg Page {pageNumber + 1} / {oggPages.length} ({oggPage?.pageSize ?? 0} bytes)
      </h1>
      <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 0}>
        Previous
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= (oggPages?.length ?? 0) - 1}>
        Next
      </button>
      <h2>Ogg Page Header</h2>
      {oggPage && (
        <>
          <OggPageHeaderTable page={oggPage} showHex={showHex} />
          {_.range(0, oggPage.numberOfPageSegments).map((segmentIndex) => (
            <SegmentInfo
              key={`segment-${segmentIndex}`}
              number={segmentIndex + 1}
              size={oggPage.getSegmentSize(segmentIndex)}
              hex={showHex ? oggPage.getSegmentHex(segmentIndex) : undefined}
            />
          ))}
        </>
      )}
    </div>
  )
}

interface SegmentInfoProps {
  number: number
  size: Bytes
  hex: Option<string>
}

const SegmentInfo = ({ number, size, hex }: SegmentInfoProps) => (
  <>
    <h2>
      Segment {number} ({size} bytes)
    </h2>
    {hex && <div className="raw-hex">{hex}</div>}
  </>
)
