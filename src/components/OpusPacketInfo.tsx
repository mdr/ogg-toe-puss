import { useShowHexService } from './useShowHexService'
import { OpusFrameCountByteInfo, OpusTocByteInfo } from './OpusTocByteInfo'
import { BitRateType, FrameCount } from '../audio/opusParser'
import { asHexPair, asHexString } from '../util/hexUtils'
import React from 'react'
import { OpusPacket } from '../audio/OpusPacket'

export interface OpusPacketInfoProps {
  packet: OpusPacket
}

export const OpusPacketInfo = ({ packet }: OpusPacketInfoProps) => {
  const { showHex } = useShowHexService()
  const opusToc = packet.toc
  return (
    <>
      <h4>TOC Byte</h4>
      <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc6716#section-3.1">
        RFC 6716 - 3.1. The TOC Byte
      </a>
      <OpusTocByteInfo opusToc={opusToc} />
      {showHex && <div className="raw-hex">{asHexPair(packet.dataWindow.getByte(0))}</div>}
      {opusToc.frameCount === FrameCount.ARBITRARY_FRAMES && (
        <>
          <h4>Frame Count Byte</h4>
          <a className="rfc-link" href="https://datatracker.ietf.org/doc/html/rfc6716#section-3.2.5">
            RFC 6716 - 3.2.5. Code 3: A Signaled Number of Frames in the Packet
          </a>
          <OpusFrameCountByteInfo opusFrameCountByte={packet.frameCount} />
          {showHex && <div className="raw-hex">{asHexPair(packet.dataWindow.getByte(1))}</div>}
          {packet.frameCount.bitRateType === BitRateType.CBR && (
            <>
              <h4>Rest of Packet</h4>
              {showHex && <div className="raw-hex">{asHexString(packet.dataWindow.getArrayBufferSlice(2), true)}</div>}
            </>
          )}
          {packet.frameCount.bitRateType === BitRateType.VBR && (
            <>
              <h4>Rest of Packet</h4>
              {showHex && <div className="raw-hex">{asHexString(packet.dataWindow.getArrayBufferSlice(2), true)}</div>}
            </>
          )}
        </>
      )}
      {opusToc.frameCount !== FrameCount.ARBITRARY_FRAMES && (
        <>
          <h4>Rest of Packet</h4>
          {showHex && <div className="raw-hex">{asHexString(packet.dataWindow.getArrayBufferSlice(1), true)}</div>}
        </>
      )}
    </>
  )
}
