import React from 'react'
import { OpusFrameCountByte, OpusToc } from '../audio/opusParser'

export interface OpusTocByteInfoProps {
  opusToc: OpusToc
}

export const OpusTocByteInfo = ({ opusToc }: OpusTocByteInfoProps) => (
  <ul>
    <li>Mode: {opusToc.mode}</li>
    <li>Bandwidth: {opusToc.bandwidth}</li>
    <li>Frame size: {opusToc.frameMs}ms</li>
    <li>{opusToc.stereo}</li>
    <li>Frame Count: {opusToc.frameCount}</li>
  </ul>
)

export interface OpusFrameCountByteInfoProps {
  opusFrameCountByte: OpusFrameCountByte
}

export const OpusFrameCountByteInfo = ({ opusFrameCountByte }: OpusFrameCountByteInfoProps) => (
  <ul>
    <li>{opusFrameCountByte.vbr}</li>
    <li>{opusFrameCountByte.padding}</li>
    <li>Frame Count: {opusFrameCountByte.frameCount}</li>
  </ul>
)
