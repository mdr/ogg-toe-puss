import React, { useState } from 'react'

import './App.scss'
import { OggPage } from './OggPage'
import { OggPageHeaderTable } from './OggPageHeaderTable'
import _ from 'lodash'

export interface OggPagesTabProps {
  readonly oggPages: OggPage[]
}

export const OggPagesTab = ({oggPages}: OggPagesTabProps) => {
  const [showHex, setShowHex] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const oggPage = pageNumber < oggPages.length ? oggPages[pageNumber] : undefined
  return (
    <div className="ogg-pages-tab">
      <h1>
        Ogg Page {pageNumber} ({oggPage?.pageSize ?? 0} bytes)
      </h1>
      <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 0}>
        Previous
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= (oggPages?.length ?? 0) - 1}>
        Next
      </button>
      <div className="show-hex-checkbox">
        <label htmlFor="showHex">Show Hex</label>
        <input id="showHex" onChange={() => setShowHex(!showHex)} checked={showHex} type="checkbox" />
      </div>
      <h2>Ogg Page Header</h2>
      {oggPage && (
        <>
          <OggPageHeaderTable page={oggPage} showHex={showHex} />
          {_.range(0, oggPage.numberOfPageSegments).map((segmentIndex) => (
            <React.Fragment key={`segment-${segmentIndex}`}>
              <h2 key={`segment-header-${segmentIndex}`}>
                Segment {segmentIndex} ({oggPage.getSegmentSize(segmentIndex)} bytes)
              </h2>
              {showHex && (
                <div className="ogg-segment-hex" key={`segment-hex-${segmentIndex}`}>
                  {oggPage.getSegmentHex(segmentIndex)}
                </div>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  )
}
