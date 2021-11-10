import _ from 'lodash'
import { OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { ByteTableRow, ByteTableRowSpec, CellInterpretationType } from './ByteTableRow'

export interface OggOpusIdentificationHeaderTableProps {
  header: OggOpusIdentificationHeader
  showHex: boolean
}

export const OggOpusIdentificationHeaderTable = ({ header, showHex }: OggOpusIdentificationHeaderTableProps) => {
  const row1Spec: ByteTableRowSpec = {
    startByte: 0,
    endByte: 3,
    cells: [
      {
        width: 4,
        colour: 1,
        header: 'Magic Signature',
        interpretation: {
          type: CellInterpretationType.MULTIPLE,
          labels: _.range(4).map((i) => header.magicSignature[i]),
        },
        hex: _.range(4).map(header.getMagicSignatureHex),
      },
    ],
  }
  const row2Spec: ByteTableRowSpec = {
    startByte: 4,
    endByte: 7,
    cells: [
      {
        width: 4,
        colour: 1,
        interpretation: {
          type: CellInterpretationType.MULTIPLE,
          labels: _.range(4, 4 + 4).map((i) => header.magicSignature[i]),
        },
        hex: _.range(4, 4 + 4).map(header.getMagicSignatureHex),
      },
    ],
  }
  const row3Spec: ByteTableRowSpec = {
    startByte: 8,
    endByte: 11,
    cells: [
      {
        width: 1,
        colour: 2,
        header: 'Version',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.version.toString(),
        },
        hex: [header.versionHex],
      },
      {
        width: 1,
        colour: 3,
        header: 'Channel Count',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.channelCount.toString(),
        },
        hex: [header.channelCountHex],
      },
      {
        width: 2,
        colour: 4,
        header: 'Pre-skip',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.preSkip.toString(),
        },
        hex: _.range(2).map(header.getPreSkipHex),
      },
    ],
  }
  const row4Spec: ByteTableRowSpec = {
    startByte: 12,
    endByte: 15,
    cells: [
      {
        width: 4,
        colour: 5,
        header: 'Input Sample Rate',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.inputSampleRate.toString(),
        },
        hex: _.range(4).map(header.getInputSampleRateHex),
      },
    ],
  }
  const row5Spec: ByteTableRowSpec = {
    startByte: 16,
    endByte: 19,
    cells: [
      {
        width: 2,
        colour: 6,
        header: 'Output Gain',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.outputGain.toString(),
        },
        hex: _.range(2).map(header.getOutputGainHex),
      },
      {
        width: 1,
        colour: 7,
        header: 'Mapping Family',
        interpretation: {
          type: CellInterpretationType.SINGLE,
          label: header.channelMappingFamily.toString(),
        },
        hex: [header.channelMappingFamilyHex],
      },
    ],
  }
  return (
    <table className="id-header-table byte-table">
      <tbody>
        <ByteTableRow showHex={showHex} rowSpec={row1Spec} />
        <ByteTableRow showHex={showHex} rowSpec={row2Spec} />
        <ByteTableRow showHex={showHex} rowSpec={row3Spec} />
        <ByteTableRow showHex={showHex} rowSpec={row4Spec} />
        <ByteTableRow showHex={showHex} rowSpec={row5Spec} />
      </tbody>
    </table>
  )
}
