import React from 'react'

import './App.scss'
import { asHexString } from '../util/hexUtils'
import { isOggOpusCommentHeader, OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { isOggOpusIdentificationHeader, OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { DataWindow } from '../util/DataWindow'
import { OggOpusCommentHeaderTable } from './OggOpusCommentHeaderTable'
import { OggOpusIdentificationHeaderTable } from './OggOpusIdentificationHeaderTable'

export interface OggPacketsListProps {
  showHex: boolean
  packets: ArrayBuffer[]
  isOpus: boolean
}

const isUnknownPacket = (packet: ArrayBuffer): boolean =>
  !isOggOpusIdentificationHeader(packet) && !isOggOpusCommentHeader(packet)

export const OggPacketsList = ({ packets, showHex, isOpus }: OggPacketsListProps) => (
  <>
    {packets.map((packet, i) => (
      <React.Fragment key={`packet-${i}`}>
        {isUnknownPacket(packet) && isOpus && (
          <>
            <h3>
              Packet {i + 1} ({packet.byteLength} bytes) - Opus Packet
            </h3>
            {showHex && (
              <div className="raw-hex" key={`packet-hex-${i}`}>
                {asHexString(packet, true)}
              </div>
            )}
          </>
        )}
        {isUnknownPacket(packet) && !isOpus && (
          <>
            <h3>
              Packet {i + 1} ({packet.byteLength} bytes)
            </h3>
            {showHex && (
              <div className="raw-hex" key={`packet-hex-${i}`}>
                {asHexString(packet, true)}
              </div>
            )}
          </>
        )}
        {isOggOpusIdentificationHeader(packet) && (
          <>
            <h3>
              Packet {i + 1} ({packet.byteLength} bytes) - Ogg Opus Identification Header
            </h3>
            <p>
              <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc7845#section-5.1">
                RFC 7845 - 5.1. Identification Header
              </a>
            </p>
            <OggOpusIdentificationHeaderTable
              header={new OggOpusIdentificationHeader(new DataWindow(packet))}
              showHex={showHex}
            />
            <p />
          </>
        )}
        {isOggOpusCommentHeader(packet) && (
          <>
            <h3>
              Packet {i + 1} ({packet.byteLength} bytes) - Ogg Opus Comment Header
            </h3>
            <p>
              <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc7845#section-5.2">
                RFC 7845 - 5.2. Comment Header
              </a>
            </p>
            <OggOpusCommentHeaderTable header={new OggOpusCommentHeader(new DataWindow(packet))} showHex={showHex} />
            <p />
          </>
        )}
      </React.Fragment>
    ))}
  </>
)
