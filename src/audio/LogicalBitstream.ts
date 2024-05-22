import { BitstreamSerialNumber } from './OggPage'
import { isOggOpusIdentificationHeader } from './OggOpusIdentificationHeader'

export interface LogicalBitstream {
  readonly serialNumber: BitstreamSerialNumber
  readonly packets: ArrayBuffer[]
}

export const isBitstreamOpus = (bitstream: LogicalBitstream): boolean =>
  bitstream.packets.some((packet) => isOggOpusIdentificationHeader(packet))
