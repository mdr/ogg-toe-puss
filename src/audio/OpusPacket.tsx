import { DataWindow } from '../util/DataWindow'
import { OpusFrameCountByte, OpusToc, parseOpusFrameCountByte, parseTocByte } from './opusParser'

export class OpusPacket {
  constructor(readonly dataWindow: DataWindow) {}

  get toc(): OpusToc {
    return parseTocByte(this.dataWindow.getByte(0))
  }

  get frameCount(): OpusFrameCountByte {
    return parseOpusFrameCountByte(this.dataWindow.getByte(1))
  }
}
