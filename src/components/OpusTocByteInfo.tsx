import React from 'react'
import { OpusToc } from '../audio/opusParser'

export interface OpusTocByteInfoProps {
  opusToc: OpusToc
}

export const OpusTocByteInfo = ({ opusToc }: OpusTocByteInfoProps) => (
  <ul>
    <li>Mode: {opusToc.mode}</li>
    <li>Bandwidth: {opusToc.bandwidth}</li>
    <li>Frame size (ms): {opusToc.frameMs}</li>
    <li>{opusToc.stereo}</li>
    <li>Frame Count: {opusToc.frameCount}</li>
  </ul>
)
