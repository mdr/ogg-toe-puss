import { DataWindow } from '../util/DataWindow'
import { asHexPair } from '../util/hexUtils'

export const isOggOpusCommentHeader = (packet: ArrayBuffer, packetIndex: number): boolean => {
  if (packet.byteLength < 8) {
    return false
  }
  const magicSignature = new TextDecoder().decode(packet.slice(0, 8))
  return packetIndex === 1 && magicSignature === 'OpusTags'
}
export class OggOpusCommentHeader {
  constructor(private readonly dataWindow: DataWindow) {}

  get magicSignature(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(0, 8))
  }

  getMagicSignatureHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(0 + byteIndex))

  get vendorStringLength(): number {
    return this.dataWindow.getUint32(8)
  }

  getVendorStringLengthHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(8 + byteIndex))

  get vendorString(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(12, this.vendorStringLength))
  }

  getVendorStringHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(12 + byteIndex))
}
