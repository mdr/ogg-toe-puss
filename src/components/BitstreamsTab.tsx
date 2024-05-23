import React, { useState } from 'react'

import './App.scss'
import { BitstreamSerialNumber } from '../audio/OggPage'
import { detectStreamType } from '../audio/oggParser'
import _ from 'lodash'
import { OggPacketsList } from './OggPacketsList'
import { LogicalBitstream } from '../audio/LogicalBitstream'

export interface BitstreamsTabProps {
  streams: LogicalBitstream[]
  opusBitstreamSerialNumbers: BitstreamSerialNumber[]
}

export const BitstreamsTab = ({ streams, opusBitstreamSerialNumbers }: BitstreamsTabProps) => {
  const [previousStreams, setPreviousStreams] = useState<LogicalBitstream[]>(streams)
  const [selectedStreamSerialNumber, setSelectedStreamSerialNumber] = useState<BitstreamSerialNumber>(
    streams[0].serialNumber
  )
  if (previousStreams !== streams) {
    setPreviousStreams(streams)
    setSelectedStreamSerialNumber(streams[0].serialNumber)
  }

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
      <OggPacketsList packets={stream.packets} isOpus={opusBitstreamSerialNumbers.includes(stream.serialNumber)} />
    </div>
  )
}
