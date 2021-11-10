export class DataWindow {
  private readonly bytes: Uint8Array
  private readonly dataView: DataView
  private readonly offset: number

  constructor(arrayBuffer: ArrayBuffer, offset: number = 0) {
    this.bytes = new Uint8Array(arrayBuffer)
    this.dataView = new DataView(arrayBuffer)
    this.offset = offset
  }

  getByte = (offset: number): number => this.bytes[offset + this.offset]

  getBigInt64 = (offset: number): bigint => this.dataView.getBigInt64(offset + this.offset, true)

  getInt16 = (offset: number): number => this.dataView.getInt16(offset + this.offset, true)

  getInt32 = (offset: number): number => this.dataView.getInt32(offset + this.offset, true)

  getUint32 = (offset: number): number => this.dataView.getUint32(offset + this.offset, true)

  getUint16 = (offset: number): number => this.dataView.getUint16(offset + this.offset, true)

  getUint8 = (offset: number): number => this.dataView.getUint8(offset + this.offset)

  getArrayBufferSlice = (offset: number, length: number): ArrayBuffer =>
    this.bytes.slice(this.offset + offset, this.offset + offset + length).buffer

  slide = (offset: number): DataWindow => new DataWindow(this.bytes.buffer, this.offset + offset)
}
