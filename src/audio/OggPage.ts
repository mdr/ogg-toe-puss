import _ from 'lodash'
import { DataWindow } from '../util/DataWindow'
import { asHexString } from '../util/hexUtils'
import { Bytes } from '../util/types'

export type BitstreamSerialNumber = string

export class OggPage {
  constructor(readonly dataWindow: DataWindow) {}

  get capturePattern(): string {
    return new TextDecoder().decode(this.dataWindow.getArrayBufferSlice(0, 4))
  }

  get version(): number {
    return this.dataWindow.getByte(4)
  }

  private get headerType(): number {
    return this.dataWindow.getByte(5)
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

  get bitstreamSerialNumber(): string {
    return asHexString(this.dataWindow.getArrayBufferSlice(14, 4))
  }

  get pageSequenceNumber(): number {
    return this.dataWindow.getInt32(18)
  }

  get crcChecksum(): string {
    return asHexString(this.dataWindow.getArrayBufferSlice(22, 4))
  }

  get numberOfPageSegments(): number {
    return this.dataWindow.getByte(26)
  }

  getSegmentSize = (segmentIndex: number): Bytes => this.dataWindow.getByte(27 + segmentIndex)

  get segmentSizes(): Bytes[] {
    return _.range(this.numberOfPageSegments).map(this.getSegmentSize)
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

  getSegment = (segmentIndex: number): ArrayBuffer => this.segments[segmentIndex]

  get headerSize(): Bytes {
    return 27 + this.numberOfPageSegments
  }

  get pageSize(): Bytes {
    return this.headerSize + _.sum(this.segmentSizes)
  }
}
