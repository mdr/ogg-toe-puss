import React, { useEffect, useState } from 'react'

import './App.scss'
import { OggPage } from './OggPage'
import { parseOggPages } from './oggParser'
import { extractBitstreams, LogicalBitstream } from './packetExtractor'
import { OggPagesTab } from './OggPagesTab'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

export const App = () => {
  const [oggPages, setOggPages] = useState<OggPage[]>()
  const [, setBitstreams] = useState<LogicalBitstream[]>()
  useEffect(() => {
    fetch(opusFile).then(async (response) => {
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const oggPages = parseOggPages(arrayBuffer)
      const bitstreams = extractBitstreams(oggPages)
      setOggPages(oggPages)
      setBitstreams(bitstreams)
    })
  }, [])
  return (
    <div className="app">
      <OggPagesTab oggPages={oggPages ?? []} />
    </div>
  )
}
