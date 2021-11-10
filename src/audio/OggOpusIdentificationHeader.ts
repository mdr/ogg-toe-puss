import { DataWindow } from '../util/DataWindow'
import { asHexPair } from '../util/hexUtils'

export const isOggOpusIdentificationHeader = (packet: ArrayBuffer, packetIndex: number): boolean => {
  if (packet.byteLength < 8) {
    return false
  }
  const magicSignature = new TextDecoder().decode(packet.slice(0, 8))
  return packetIndex === 0 && magicSignature === 'OpusHead'
}

export class OggOpusIdentificationHeader {
  constructor(private readonly dataWindow: DataWindow) {}

  get magicSignature(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(0, 8))
  }

  getMagicSignatureHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(0 + byteIndex))

  get version(): number {
    return this.dataWindow.getUint8(8)
  }

  get versionHex(): string {
    return asHexPair(this.version)
  }

  get channelCount(): number {
    return this.dataWindow.getUint8(9)
  }

  get channelCountHex(): string {
    return asHexPair(this.channelCount)
  }

  get preSkip(): number {
    return this.dataWindow.getUint16(10)
  }

  getPreSkipHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(10 + byteIndex))

  get inputSampleRate(): number {
    return this.dataWindow.getUint32(12)
  }

  getInputSampleRateHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(12 + byteIndex))

  get outputGain(): number {
    return this.dataWindow.getInt16(16)
  }

  getOutputGainHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(16 + byteIndex))

  get channelMappingFamily(): number {
    return this.dataWindow.getUint8(18)
  }

  get channelMappingFamilyHex(): string {
    return asHexPair(this.channelMappingFamily)
  }
}
