import { OggPage } from "./OggPage"
import _ from 'lodash'

export type BitstreamSerialNumber = number

export interface LogicalBitstream {
    readonly serialNumber: BitstreamSerialNumber
    readonly packets: ArrayBuffer[]
}

interface PacketInfo {
    packets: ArrayBuffer[]
    segmentsSoFar: ArrayBuffer[]
}

export const extractBitstreams = (pages: OggPage[]): LogicalBitstream[] => {
    const packetInfoPerStream = new Map<BitstreamSerialNumber, PacketInfo>()
    const completedLogicalStreams: LogicalBitstream[] = []
    for (const page of pages) {
        if (page.isFirstPage) {
            packetInfoPerStream.set(page.bitstreamSerialNumber, { packets: [], segmentsSoFar: []})
        }
        const packetInfo = packetInfoPerStream.get(page.bitstreamSerialNumber)
        if (packetInfo === undefined) {
            throw Error(`Unexpected page for bitstream with serial number ${page.bitstreamSerialNumber}`)
        }
        for (const segment of page.segments) {
            packetInfo.segmentsSoFar.push(segment)
            const segmentCompletesPacket = segment.byteLength < 255
            if (segmentCompletesPacket) {
                const packet = concatenateArrayBuffers(packetInfo.segmentsSoFar)
                packetInfo.packets.push(packet)
                packetInfo.segmentsSoFar.length = 0
            }
        }
        if (page.isLastPage) {
            completedLogicalStreams.push({ serialNumber: page.bitstreamSerialNumber, packets: packetInfo.packets})
            packetInfoPerStream.delete(page.bitstreamSerialNumber)
        }
    }
    return completedLogicalStreams
}

const concatenateArrayBuffers = (buffers: ArrayBuffer[]): ArrayBuffer => {
    const array = new Uint8Array(_.sumBy(buffers, buffer => buffer.byteLength))
    let offset = 0
    for (const buffer of buffers) {
        array.set(new Uint8Array(buffer), offset)
        offset += buffer.byteLength
    }
    return array.buffer
}