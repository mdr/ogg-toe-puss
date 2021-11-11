import { DataWindow } from '../util/DataWindow'

export const isOggOpusCommentHeader = (packet: ArrayBuffer): boolean => {
  if (packet.byteLength < 8) {
    return false
  }
  const magicSignature = new TextDecoder().decode(packet.slice(0, 8))
  return magicSignature === 'OpusTags'
}
export class OggOpusCommentHeader {
  constructor(readonly dataWindow: DataWindow) {}

  get magicSignature(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(0, 8))
  }

  get vendorStringLength(): number {
    return this.dataWindow.getUint32(8)
  }

  get vendorString(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(12, this.vendorStringLength))
  }

  get userCommentListLength(): number {
    return this.dataWindow.getUint32(12 + this.vendorStringLength)
  }
}
