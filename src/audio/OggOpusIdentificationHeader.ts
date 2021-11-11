import { DataWindow } from '../util/DataWindow'

export const isOggOpusIdentificationHeader = (packet: ArrayBuffer, packetIndex: number): boolean => {
  if (packet.byteLength < 8) {
    return false
  }
  const magicSignature = new TextDecoder().decode(packet.slice(0, 8))
  return packetIndex === 0 && magicSignature === 'OpusHead'
}

export class OggOpusIdentificationHeader {
  constructor(readonly dataWindow: DataWindow) {}

  get magicSignature(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(0, 8))
  }

  get version(): number {
    return this.dataWindow.getUint8(8)
  }

  get channelCount(): number {
    return this.dataWindow.getUint8(9)
  }

  get preSkip(): number {
    return this.dataWindow.getUint16(10)
  }

  get inputSampleRate(): number {
    return this.dataWindow.getUint32(12)
  }

  get outputGain(): number {
    return this.dataWindow.getInt16(16)
  }

  get channelMappingFamily(): number {
    return this.dataWindow.getUint8(18)
  }
}
