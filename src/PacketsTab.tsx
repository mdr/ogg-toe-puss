import React from 'react'

import './App.scss'
import { LogicalBitstream } from './packetExtractor'
import { asHexString } from './hexUtils'
import { OggOpusIdentificationHeader } from './OggOpusIdentificationHeader'
import { DataWindow } from './DataWindow'
import { OggOpusIdentificationHeaderTable } from './OggOpusIdentificationHeaderTable'
import { OggOpusCommentHeaderTable } from './OggOpusCommentHeaderTable'
import { OggOpusCommentHeader } from './OggOpusCommentHeader'
import { useShowHex } from './showHexHook'

export interface PacketsTabProps {
  streams: LogicalBitstream[]
}

export const PacketsTab = ({ streams }: PacketsTabProps) => {
  const stream = streams[0]
  const { showHex, setShowHex } = useShowHex()
  return (
    <div>
      <h1>Ogg Packets</h1>
      <p>Bitstream serial number: {stream.serialNumber}</p>
      <div className="show-hex-checkbox">
        <label htmlFor="showHex">Show Hex</label>
        <input id="showHex" onChange={() => setShowHex(!showHex)} checked={showHex} type="checkbox" />
      </div>
      {stream.packets.map((packet, i) => (
        <React.Fragment key={`packet-${i}`}>
          <h2>
            Packet {i + 1} ({packet.byteLength} bytes)
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
          {i === 1 && (
            <>
              <h3>Ogg Opus Comment Header</h3>
              <OggOpusCommentHeaderTable header={new OggOpusCommentHeader(new DataWindow(packet))} showHex={showHex} />
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
