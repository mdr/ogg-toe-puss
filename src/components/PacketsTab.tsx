import React from 'react'

import './App.scss'
import { LogicalBitstream } from '../audio/packetExtractor'
import { asHexString } from '../util/hexUtils'
import { isOggOpusIdentificationHeader, OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { DataWindow } from '../util/DataWindow'
import { OggOpusIdentificationHeaderTable } from './OggOpusIdentificationHeaderTable'
import { OggOpusCommentHeaderTable } from './OggOpusCommentHeaderTable'
import { isOggOpusCommentHeader, OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { useShowHex } from './showHexHook'

export interface PacketsTabProps {
  streams: LogicalBitstream[]
}

export const PacketsTab = ({ streams }: PacketsTabProps) => {
  const stream = streams[0]
  const { showHex } = useShowHex()
  return (
    <div>
      <h1>Ogg Packets</h1>
      <p>Bitstream serial number: {stream.serialNumber}</p>
      {stream.packets.map((packet, i) => (
        <React.Fragment key={`packet-${i}`}>
          <h2>
            Packet {i + 1} ({packet.byteLength} bytes)
          </h2>
          {isOggOpusIdentificationHeader(packet, i) && (
            <>
              <h3>Ogg Opus Identification Header</h3>
              <OggOpusIdentificationHeaderTable
                header={new OggOpusIdentificationHeader(new DataWindow(packet))}
                showHex={showHex}
              />
            </>
          )}
          {isOggOpusCommentHeader(packet, i) && (
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
