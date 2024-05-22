import React from 'react'

import './App.scss'
import { asHexString } from '../util/hexUtils'
import { isOggOpusCommentHeader, OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { isOggOpusIdentificationHeader, OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { DataWindow } from '../util/DataWindow'
import { OggOpusCommentHeaderTable } from './OggOpusCommentHeaderTable'
import { OggOpusIdentificationHeaderTable } from './OggOpusIdentificationHeaderTable'
import { FrameCount, parseOpusFrameCountByte, parseTocByte } from '../audio/opusParser'
import { OpusFrameCountByteInfo, OpusTocByteInfo } from './OpusTocByteInfo'

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
            <h4>TOC Byte</h4>
            <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc6716#section-3.1">
              RFC 6716 - 3.1. The TOC Byte
            </a>
            <OpusTocByteInfo opusToc={parseTocByte(new DataWindow(packet).getByte(0))} />
            {parseTocByte(new DataWindow(packet).getByte(0)).frameCount === FrameCount.ARBITRARY_FRAMES && (
              <>
                <h4>Frame Count Byte</h4>
                <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc6716#section-3.2.5">
                  RFC 6716 - 3.2.5. Code 3: A Signaled Number of Frames in the Packet
                </a>
                <OpusFrameCountByteInfo
                  opusFrameCountByte={parseOpusFrameCountByte(new DataWindow(packet).getByte(1))}
                />
              </>
            )}
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
