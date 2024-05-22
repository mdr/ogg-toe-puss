import React, { useEffect, useState } from 'react'
import { BitstreamSerialNumber, OggPage } from '../audio/OggPage'
import { extractBitstreams } from '../audio/packetExtractor'
import { useShowHexService } from './useShowHexService'
import { parseOggPages } from '../audio/oggParser'
import { Dropzone } from './Dropzone'
import { OggPagesTab } from './OggPagesTab'
import { BitstreamsTab } from './BitstreamsTab'
import { fetchBinaryFile } from '../util/networkUtils'
import { isBitstreamOpus, LogicalBitstream } from '../audio/LogicalBitstream'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

enum AppTab {
  OGG_PAGES = 'OGG_PAGES',
  BITSTREAMS = 'BITSTREAMS',
}

export const Main = () => {
  const [oggPages, setOggPages] = useState<OggPage[]>([])
  const [bitstreams, setBitstreams] = useState<LogicalBitstream[]>([])
  const [opusBitstreamSerialNumbers, setOpusBitstreamSerialNumbers] = useState<BitstreamSerialNumber[]>([])
  const [tab, setTab] = useState<AppTab>(AppTab.OGG_PAGES)
  const { showHex, setShowHex } = useShowHexService()
  const importFile = (arrayBuffer: ArrayBuffer) => {
    const oggPages = parseOggPages(arrayBuffer)
    const bitstreams = extractBitstreams(oggPages)
    const opusBitstreamSerialNumbers = bitstreams.filter(isBitstreamOpus).map((bitstream) => bitstream.serialNumber)
    setOggPages(oggPages)
    setBitstreams(bitstreams)
    setOpusBitstreamSerialNumbers(opusBitstreamSerialNumbers)
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
      {tab === AppTab.OGG_PAGES && (
        <OggPagesTab oggPages={oggPages} opusBitstreamSerialNumbers={opusBitstreamSerialNumbers} />
      )}
      {tab === AppTab.BITSTREAMS && (
        <BitstreamsTab streams={bitstreams} opusBitstreamSerialNumbers={opusBitstreamSerialNumbers} />
      )}
    </div>
  )
}
