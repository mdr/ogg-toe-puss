export enum Mode {
  SILK = 'SILK-only',
  HYBRID = 'Hybrid',
  CELT = 'CELT-only',
}

export enum Bandwidth {
  NB = 'NB',
  MB = '<B>',
  WB = 'WB',
  SWB = 'SWB',
  FB = 'FB',
}

export enum Stereo {
  MONO = 'Mono',
  STEREO = 'Stereo',
}

export enum FrameCount {
  ONE_FRAME = '1 frame',
  TWO_FRAMES_SAME_SIZE = '2 frames, equal size',
  TWO_FRAMES_DIFF_SIZE = '2 frames, different sizes',
  ARBITRARY_FRAMES = 'Arbitrary number of frames',
}

export interface OpusToc {
  mode: Mode
  bandwidth: Bandwidth
  frameMs: number
  stereo: Stereo
  frameCount: FrameCount
}

export const parseTocByte = (tocByte: number): OpusToc => {
  const config = (tocByte >> 3) & 0x1f
  const stereo = (tocByte >> 2) & 0x01 ? Stereo.STEREO : Stereo.MONO
  const frameCountCode = tocByte & 0x03

  let mode: Mode
  let bandwidth: Bandwidth
  let frameMs: number

  switch (true) {
    case config >= 0 && config <= 3:
      mode = Mode.SILK
      bandwidth = Bandwidth.NB
      frameMs = [10, 20, 40, 60][config % 4]
      break
    case config >= 4 && config <= 7:
      mode = Mode.SILK
      bandwidth = Bandwidth.MB
      frameMs = [10, 20, 40, 60][config % 4]
      break
    case config >= 8 && config <= 11:
      mode = Mode.SILK
      bandwidth = Bandwidth.WB
      frameMs = [10, 20, 40, 60][config % 4]
      break
    case config >= 12 && config <= 13:
      mode = Mode.HYBRID
      bandwidth = Bandwidth.SWB
      frameMs = [10, 20][config % 2]
      break
    case config >= 14 && config <= 15:
      mode = Mode.HYBRID
      bandwidth = Bandwidth.FB
      frameMs = [10, 20][config % 2]
      break
    case config >= 16 && config <= 19:
      mode = Mode.CELT
      bandwidth = Bandwidth.NB
      frameMs = [2.5, 5, 10, 20][config % 4]
      break
    case config >= 20 && config <= 23:
      mode = Mode.CELT
      bandwidth = Bandwidth.WB
      frameMs = [2.5, 5, 10, 20][config % 4]
      break
    case config >= 24 && config <= 27:
      mode = Mode.CELT
      bandwidth = Bandwidth.SWB
      frameMs = [2.5, 5, 10, 20][config % 4]
      break
    case config >= 28 && config <= 31:
      mode = Mode.CELT
      bandwidth = Bandwidth.FB
      frameMs = [2.5, 5, 10, 20][config % 4]
      break
    default:
      throw new Error('Invalid configuration.')
  }

  let frameCount: FrameCount

  switch (frameCountCode) {
    case 0:
      frameCount = FrameCount.ONE_FRAME
      break
    case 1:
      frameCount = FrameCount.TWO_FRAMES_SAME_SIZE
      break
    case 2:
      frameCount = FrameCount.TWO_FRAMES_DIFF_SIZE
      break
    case 3:
      frameCount = FrameCount.ARBITRARY_FRAMES
      break
    default:
      throw new Error('Invalid frame count code.')
  }

  return { mode, bandwidth, frameMs, stereo, frameCount }
}

export enum BitRateType {
  CBR = 'Constant Bit Rate',
  VBR = 'Variable Bit Rate',
}

export enum Padding {
  NO_PADDING = 'No Padding',
  OPUS_PADDING = 'Opus Padding',
}

export interface OpusFrameCountByte {
  vbr: BitRateType
  padding: Padding
  frameCount: number
}

export const parseOpusFrameCountByte = (frameCountByte: number): OpusFrameCountByte => {
  // Extract the VBR bit (bit 7)
  const vbr = frameCountByte & 0x80 ? BitRateType.VBR : BitRateType.CBR

  // Extract the padding bit (bit 6)
  const padding = frameCountByte & 0x40 ? Padding.OPUS_PADDING : Padding.NO_PADDING

  // Extract the frame count (bits 0 to 5)
  const frameCount = frameCountByte & 0x3f

  return { vbr, padding, frameCount }
}
