import _ from "lodash"
import { DataWindow } from "../util/DataWindow"
import { asHexPair, asHexString } from "../util/hexUtils"
import { Bytes } from "../util/types"

export class OggPage {

  constructor(private readonly dataWindow: DataWindow) {
  }

  get capturePattern(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(0, 4))
  }

  getCapturePatternHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(0 + byteIndex))
  
  get version(): number {
    return this.dataWindow.getByte(4)
  }

  get versionHex(): string {
    return asHexPair(this.version)
  }

  private get headerType(): number {
    return this.dataWindow.getByte(5)
  }

  get headerTypeHex(): string {
    return asHexPair(this.headerType)
  }

  get containsContinuedPacket(): boolean {
    return !!(this.headerType & (1 << 0))
  }

  get isFirstPage(): boolean {
    return !!(this.headerType & (1 << 1))
  }

  get isLastPage(): boolean {
    return !!(this.headerType & (1 << 2))
  }

  get granulePosition(): bigint {
    return this.dataWindow.getBigInt64(6)
  }

  getGranulePositionHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(6 + byteIndex))

  get bitstreamSerialNumber(): string {
    return asHexString(this.dataWindow.getArrayBufferSlice(14, 4))
  }

  getBitstreamSerialNumberHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(14 + byteIndex))

  get pageSequenceNumber(): number {
    return this.dataWindow.getInt32(18)
  }

  getPageSequenceNumberHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(18 + byteIndex))

  get crcChecksum(): string {
    return asHexString(this.dataWindow.getArrayBufferSlice(22, 4))
  }

  getCrcChecksumHex = (byteIndex: number): string => asHexPair(this.dataWindow.getByte(22 + byteIndex))

  get numberOfPageSegments(): number {
    return this.dataWindow.getByte(26)
  }

  get numberOfPageSegmentsHex(): string {
    return asHexPair(this.numberOfPageSegments)
  }

  getSegmentSize = (segmentIndex: number): Bytes => this.dataWindow.getByte(27 + segmentIndex)

  getSegmentSizeHex = (segmentIndex: number): string => asHexPair(this.getSegmentSize(segmentIndex))

  get segmentSizes(): Bytes[] {
    return _.range(this.numberOfPageSegments).map(this.getSegmentSize)
  }

  get headerSize(): Bytes {
    return 27 + this.numberOfPageSegments
  }

  get pageSize(): Bytes {
    return this.headerSize + _.sum(this.segmentSizes)
  }

  get segments(): ArrayBuffer[] {
    let offset = this.headerSize
    const segments: ArrayBuffer[] = []
    for (let i = 0; i < this.numberOfPageSegments; i++) {
      const segmentSize = this.getSegmentSize(i)
      const segment = this.dataWindow.getArrayBufferSlice(offset, segmentSize)
      segments.push(segment)
      offset += segmentSize
    }
    return segments
  }

  getSegmentHex = (segmentIndex: number): string => {
    const segment = this.segments[segmentIndex]
    return asHexString(segment)
  }

}
