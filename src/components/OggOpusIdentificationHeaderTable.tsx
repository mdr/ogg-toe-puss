import _ from 'lodash'
import { OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { ByteTable, ByteTableRowSpec, CellInterpretationType } from './ByteTableRow'

export interface OggOpusIdentificationHeaderTableProps {
  header: OggOpusIdentificationHeader
  showHex: boolean
}

export const OggOpusIdentificationHeaderTable = ({ header, showHex }: OggOpusIdentificationHeaderTableProps) => {
  const rowSpecs: ByteTableRowSpec[] = [
    {
      cells: [
        {
          width: 4,
          colour: 1,
          header: 'Magic Signature',
          interpretation: {
            type: CellInterpretationType.MULTIPLE,
            labels: _.range(4).map((i) => header.magicSignature[i]),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 1,
          interpretation: {
            type: CellInterpretationType.MULTIPLE,
            labels: _.range(4, 4 + 4).map((i) => header.magicSignature[i]),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 1,
          colour: 2,
          header: 'Version',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.version.toString(),
          },
        },
        {
          width: 1,
          colour: 3,
          header: 'Channel Count',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.channelCount.toString(),
          },
        },
        {
          width: 2,
          colour: 4,
          header: 'Pre-skip',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.preSkip.toString(),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 5,
          header: 'Input Sample Rate',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.inputSampleRate.toString(),
          },
        },
      ],
    },
    {
      cells: [
        {
          width: 2,
          colour: 6,
          header: 'Output Gain',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.outputGain.toString(),
          },
        },
        {
          width: 1,
          colour: 7,
          header: 'Mapping Family',
          interpretation: {
            type: CellInterpretationType.SINGLE,
            label: header.channelMappingFamily.toString(),
          },
        },
      ],
    },
  ]
  return (
    <ByteTable dataWindow={header.dataWindow} showHex={showHex} rows={rowSpecs} />
  )
}
