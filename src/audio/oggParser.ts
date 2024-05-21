import { OggPage } from './OggPage'
import { DataWindow } from '../util/DataWindow'
import { LogicalBitstream } from './packetExtractor'
import { Option } from '../util/util'
import _ from 'lodash'

export const parseOggPages = (arrayBuffer: ArrayBuffer): OggPage[] => {
  let dataWindow = new DataWindow(arrayBuffer)
  let page = new OggPage(dataWindow)
  const pages = [page]
  while (!page.isLastPage) {
    dataWindow = dataWindow.slide(page.pageSize)
    page = new OggPage(dataWindow)
    pages.push(page)
  }
  return pages
}

const CodecIdentifier = {
  Opus: [0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64], // 'OpusHead'
  Theora: [0x80, 0x74, 0x68, 0x65, 0x6f, 0x72, 0x61], // '\x80theora'
  Vorbis: [0x01, 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73], // '\x01vorbis'
  OggSkeleton: [0x66, 0x69, 0x73, 0x68, 0x65, 0x61, 0x64, 0x00], // 'fishead\0'
}

const takeBytes = (packet: ArrayBuffer, n: number): number[] =>
  Array.from(new Uint8Array(packet.slice(0, Math.min(n, packet.byteLength))))

const startsWith = (packet: ArrayBuffer, bytes: number[]): boolean => _.isEqual(takeBytes(packet, bytes.length), bytes)

export const detectStreamType = (stream: LogicalBitstream): Option<string> => {
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
