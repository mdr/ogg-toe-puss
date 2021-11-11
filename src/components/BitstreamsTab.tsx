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
import { OggPacketsList } from './OggPacketsList'

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
            <span className="bitstream-serial-number-radio-label">{stream.serialNumber}</span> -{' '}
            {detectStreamType(stream)} - {stream.packets.length} packets -{' '}
            {_.sumBy(stream.packets, (packet) => packet.byteLength)} bytes
          </label>
        </div>
      ))}
      <h2>Ogg Packets</h2>
      <OggPacketsList packets={stream.packets} showHex={showHex} />
    </div>
  )
}
