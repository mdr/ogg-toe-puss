import React, { useEffect, useState } from 'react'

import './App.scss'
import { OggPage } from './OggPage'
import { parseOggPages } from './oggParser'
import { extractBitstreams, LogicalBitstream } from './packetExtractor'
import { OggPagesTab } from './OggPagesTab'
import { asHexString } from './hexUtils'
import { OggOpusIdentificationHeader } from './OggOpusIdentificationHeader'
import { DataWindow } from './DataWindow'
import { OggOpusIdentificationHeaderTable } from './OggOpusIdentificationHeaderTable'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

enum AppTab {
  OGG_PAGES = 'OGG_PAGES',
  PACKETS = 'PACKETS',
}

interface PacketsTabProps {
  streams: LogicalBitstream[]
}

const PacketsTab = ({ streams }: PacketsTabProps) => {
  const stream = streams[0]
  const [showHex, setShowHex] = useState<boolean>(false)
  return (
    <div>
      <h1>Packets</h1>
      <p>Bitstream serial number: {stream.serialNumber}</p>
      <div className="show-hex-checkbox">
        <label htmlFor="showHex">Show Hex</label>
        <input id="showHex" onChange={() => setShowHex(!showHex)} checked={showHex} type="checkbox" />
      </div>
      {stream.packets.map((packet, i) => (
        <React.Fragment key={`packet-${i}`}>
          <h2>
            Packet {i} ({packet.byteLength} bytes)
          </h2>
          {i === 0 && (
            <>
              <h3>Ogg Opus Identification Header</h3>
              <OggOpusIdentificationHeaderTable
                header={new OggOpusIdentificationHeader(new DataWindow(packet))}
                showHex={showHex}
              />
            </>
          )}
          {showHex && (
            <div className="raw-hex" key={`packet-hex-${i}`}>
              {asHexString(packet)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
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
        Packets
      </button>

      {tab === AppTab.OGG_PAGES && <OggPagesTab oggPages={oggPages ?? []} />}
      {tab === AppTab.PACKETS && <PacketsTab streams={bitstreams} />}
    </div>
  )
}
