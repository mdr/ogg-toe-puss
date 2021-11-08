
export class DataWindow  {

    private readonly bytes: Uint8Array
    private readonly dataView: DataView
    private readonly offset: number
  
    constructor(arrayBuffer: ArrayBuffer, offset: number = 0) {
      this.bytes = new Uint8Array(arrayBuffer)
      this.dataView = new DataView(arrayBuffer)
      this.offset = offset
    }
  
    getByte = (offset: number) => this.bytes[offset + this.offset]
  
    getBigInt64 = (offset: number): bigint => this.dataView.getBigInt64(offset + this.offset, true)
    
    getInt32 = (offset: number): number => this.dataView.getInt32(offset + this.offset, true)

    getArrayBufferSlice = (offset: number, length: number): ArrayBuffer => this.bytes.slice(this.offset + offset, this.offset + offset + length).buffer

    slide = (offset: number): DataWindow => new DataWindow(this.bytes.buffer, this.offset + offset)

}
  