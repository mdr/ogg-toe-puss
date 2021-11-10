import React, { useEffect, useState } from 'react'

import './App.scss'
import { LogicalBitstream } from '../audio/packetExtractor'
import { asHexString } from '../util/hexUtils'
import { isOggOpusIdentificationHeader, OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { DataWindow } from '../util/DataWindow'
import { OggOpusIdentificationHeaderTable } from './OggOpusIdentificationHeaderTable'
import { OggOpusCommentHeaderTable } from './OggOpusCommentHeaderTable'
import { isOggOpusCommentHeader, OggOpusCommentHeader } from '../audio/OggOpusCommentHeader'
import { useShowHex } from './showHexHook'
import { BitstreamSerialNumber } from '../audio/OggPage'
import { detectStreamType } from '../audio/oggParser'
import _ from 'lodash'

export interface BitstreamsTabProps {
  streams: LogicalBitstream[]
}

export const BitstreamsTab = ({ streams }: BitstreamsTabProps) => {
  const { showHex } = useShowHex()
  const [selectedStreamSerialNumber, setSelectedStreamSerialNumber] = useState<BitstreamSerialNumber>(
    streams[0].serialNumber
  )
  useEffect(() => setSelectedStreamSerialNumber(streams[0].serialNumber), [streams])

  const stream = streams.find((stream) => stream.serialNumber === selectedStreamSerialNumber)
  if (stream === undefined) {
    return <></>
  }
  return (
    <div>
      <h1>Logical Bitstreams</h1>
      {streams.map((stream) => (
        <div key={stream.serialNumber}>
          <input
            type="radio"
            id={stream.serialNumber}
            name={stream.serialNumber}
            value={stream.serialNumber}
            checked={stream.serialNumber === selectedStreamSerialNumber}
            onChange={() => setSelectedStreamSerialNumber(stream.serialNumber)}
          />
          <label htmlFor={stream.serialNumber}>
            <span className="bitstream-serial-number-radio-label">{stream.serialNumber}</span> - {detectStreamType(stream)} - {stream.packets.length} packets - {_.sumBy(stream.packets, packet => packet.byteLength)} bytes
          </label>
        </div>
      ))}
      <h2>Ogg Packets</h2>
      {stream.packets.map((packet, i) => (
        <React.Fragment key={`packet-${i}`}>
          <h2>
            Packet {i + 1} ({packet.byteLength} bytes)
          </h2>
          {isOggOpusIdentificationHeader(packet, i) && (
            <>
              <h3>Ogg Opus Identification Header</h3>
              <p>
                <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc7845#section-5.1">
                  RFC 7845 - 5.1. Identification Header
                </a>
              </p>

              <OggOpusIdentificationHeaderTable
                header={new OggOpusIdentificationHeader(new DataWindow(packet))}
                showHex={showHex}
              />
            </>
          )}
          {isOggOpusCommentHeader(packet, i) && (
            <>
              <h3>Ogg Opus Comment Header</h3>
              <p>
                <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc7845#section-5.2">
                  RFC 7845 - 5.2. Comment Header
                </a>
              </p>
              <OggOpusCommentHeaderTable header={new OggOpusCommentHeader(new DataWindow(packet))} showHex={showHex} />
            </>
          )}
          {showHex && (
            <div className="raw-hex" key={`packet-hex-${i}`}>
              {asHexString(packet, true)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
