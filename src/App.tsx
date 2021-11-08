import React, { useEffect, useState } from 'react'

import './App.scss'
import { OggPage } from './OggPage'
import { OggPageHeaderTable } from './OggPageHeaderTable'
import _ from 'lodash'
import { parseOggPages } from './oggParser'
import { extractBitstreams } from './packetExtractor'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

function App() {
  const [oggPages, setOggPages] = useState<OggPage[]>()
  const [showHex, setShowHex] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(0)
  useEffect(() => {
    fetch(opusFile).then(async (response) => {
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const oggPages = parseOggPages(arrayBuffer)
      console.log(extractBitstreams(oggPages))
      setOggPages(oggPages)
    })
  }, [])
  const handleToggleShowHex = () => setShowHex(!showHex)
  const oggPage = oggPages !== undefined && pageNumber < oggPages.length ? oggPages[pageNumber] : undefined
  return (
    <div className="app">
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
        <input id="showHex" onChange={handleToggleShowHex} checked={showHex} type="checkbox" />
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

export default App
