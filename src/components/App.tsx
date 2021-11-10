import React, { useEffect, useState } from 'react'
import { OggPage } from '../audio/OggPage'
import { parseOggPages } from '../audio/oggParser'
import { LogicalBitstream, extractBitstreams } from '../audio/packetExtractor'

import './App.scss'
import { OggPagesTab } from './OggPagesTab'
import { PacketsTab } from './PacketsTab'
import { ShowHexProvider } from './showHexHook'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

enum AppTab {
  OGG_PAGES = 'OGG_PAGES',
  PACKETS = 'PACKETS',
}

const fetchBinaryFile = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(opusFile)
  const blob = await response.blob()
  return await blob.arrayBuffer()
}

export const App = () => {
  const [oggPages, setOggPages] = useState<OggPage[]>()
  const [bitstreams, setBitstreams] = useState<LogicalBitstream[]>([])
  const [tab, setTab] = useState<AppTab>(AppTab.OGG_PAGES)
  useEffect(() => {
    fetchBinaryFile(opusFile).then((arrayBuffer) => {
      const oggPages = parseOggPages(arrayBuffer)
      const bitstreams = extractBitstreams(oggPages)
      setOggPages(oggPages)
      setBitstreams(bitstreams)
    })
  }, [])
  return (
    <ShowHexProvider>
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
    </ShowHexProvider>
  )
}
