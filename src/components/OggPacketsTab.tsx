import React, { useState } from 'react'

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
import { Option } from '../util/util'
import _ from 'lodash'

export interface PacketsTabProps {
  streams: LogicalBitstream[]
}

const CodecIdentifier = {
  Opus: [0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64], // 'OpusHead'
  Theora: [0x80, 0x74, 0x68, 0x65, 0x6f, 0x72, 0x61], // '\x80theora'
  Vorbis: [0x01, 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73], // '\x01vorbis'
  OggSkeleton: [0x66, 0x69, 0x73, 0x68, 0x65, 0x61, 0x64, 0x00], // 'fishead\0'
}

const takeBytes = (packet: ArrayBuffer, n: number): number[] =>
  Array.from(new Uint8Array(packet.slice(0, Math.min(n, packet.byteLength))))

const startsWith = (packet: ArrayBuffer, bytes: number[]): boolean =>
  _.isEqual(takeBytes(packet, bytes.length), bytes)

const detectStreamType = (stream: LogicalBitstream): Option<string> => {
  if (stream.packets.length === 0) {
    return undefined
  }
  const firstPacket = stream.packets[0]
  if (startsWith(firstPacket, CodecIdentifier.Opus)) return 'opus'
  if (startsWith(firstPacket, CodecIdentifier.Theora)) return 'theora'
  if (startsWith(firstPacket, CodecIdentifier.Vorbis)) return 'vorbis'
  if (startsWith(firstPacket, CodecIdentifier.OggSkeleton)) return 'ogg-skeleton'
  return undefined
}

export const OggPacketsTab = ({ streams }: PacketsTabProps) => {
  const { showHex } = useShowHex()
  const [selectedStreamSerialNumber, setSelectedStreamSerialNumber] = useState<BitstreamSerialNumber>(
    streams[0].serialNumber
  )
  const stream = streams.find((stream) => stream.serialNumber === selectedStreamSerialNumber)!!
  return (
    <div>
      <h1>Ogg Packets</h1>
      <h2>Logical Bitstreams</h2>
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
            <span className="bitstream-serial-number-radio-label">{stream.serialNumber}</span> - {detectStreamType(stream)}
          </label>
        </div>
      ))}
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
              {asHexString(packet)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
