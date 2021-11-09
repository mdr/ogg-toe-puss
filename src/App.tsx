import React, { useEffect, useState } from 'react'

import './App.scss'
import { OggPage } from './OggPage'
import { parseOggPages } from './oggParser'
import { extractBitstreams, LogicalBitstream } from './packetExtractor'
import { OggPagesTab } from './OggPagesTab'
import { PacketsTab } from './PacketsTab'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`
//const opusFile = `${process.env.PUBLIC_URL}/sample1.opus`

enum AppTab {
  OGG_PAGES = 'OGG_PAGES',
  PACKETS = 'PACKETS',
}

export const App = () => {
  const [oggPages, setOggPages] = useState<OggPage[]>()
  const [bitstreams, setBitstreams] = useState<LogicalBitstream[]>([])
  const [tab, setTab] = useState<AppTab>(AppTab.OGG_PAGES)
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
      <button onClick={() => setTab(AppTab.OGG_PAGES)} disabled={tab === AppTab.OGG_PAGES}>
        Ogg Pages
      </button>
      <button onClick={() => setTab(AppTab.PACKETS)} disabled={tab === AppTab.PACKETS}>
        Ogg Packets
      </button>

      {tab === AppTab.OGG_PAGES && <OggPagesTab oggPages={oggPages ?? []} />}
      {tab === AppTab.PACKETS && <PacketsTab streams={bitstreams} />}
    </div>
  )
}
