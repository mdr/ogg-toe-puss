import React, { useEffect, useState } from 'react'
import { OggPage } from '../audio/OggPage'
import { extractBitstreams, LogicalBitstream } from '../audio/packetExtractor'
import { useShowHex } from './showHexHook'
import { parseOggPages } from '../audio/oggParser'
import { Dropzone } from './Dropzone'
import { OggPagesTab } from './OggPagesTab'
import { BitstreamsTab } from './BitstreamsTab'
import { fetchBinaryFile } from '../util/networkUtils'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

enum AppTab {
  OGG_PAGES = 'OGG_PAGES',
  BITSTREAMS = 'BITSTREAMS',
}

export const Main = () => {
  const [oggPages, setOggPages] = useState<OggPage[]>()
  const [bitstreams, setBitstreams] = useState<LogicalBitstream[]>([])
  const [tab, setTab] = useState<AppTab>(AppTab.OGG_PAGES)
  const { showHex, setShowHex } = useShowHex()
  const importFile = (arrayBuffer: ArrayBuffer) => {
    const oggPages = parseOggPages(arrayBuffer)
    const bitstreams = extractBitstreams(oggPages)
    setOggPages(oggPages)
    setBitstreams(bitstreams)
  }
  useEffect(() => {
    fetchBinaryFile(opusFile).then(importFile)
  }, [])
  return (
    <div className="app">
      <button onClick={() => setTab(AppTab.OGG_PAGES)} disabled={tab === AppTab.OGG_PAGES}>
        Ogg Pages
      </button>
      <button onClick={() => setTab(AppTab.BITSTREAMS)} disabled={tab === AppTab.BITSTREAMS}>
        Logical Bitstreams
      </button>
      <div className="show-hex-checkbox">
        <label htmlFor="showHex">Show Hex</label>
        <input id="showHex" onChange={() => setShowHex(!showHex)} checked={showHex} type="checkbox" />
      </div>
      <Dropzone onDrop={async (file) => importFile(await file.arrayBuffer())} />
      {tab === AppTab.OGG_PAGES && <OggPagesTab oggPages={oggPages ?? []} />}
      {tab === AppTab.BITSTREAMS && <BitstreamsTab streams={bitstreams} />}
    </div>
  )
}