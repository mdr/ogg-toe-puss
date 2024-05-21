import _ from 'lodash'
import { OggOpusIdentificationHeader } from '../audio/OggOpusIdentificationHeader'
import { ByteTable } from './ByteTableRow'
import { ByteTableRowSpec, multipleCellInterpretation, singleCellInterpretation } from './ByteTableRowSpec'

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
          interpretation: multipleCellInterpretation(_.range(4).map((i) => header.magicSignature[i])),
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 1,
          interpretation: multipleCellInterpretation(_.range(4, 4 + 4).map((i) => header.magicSignature[i])),
        },
      ],
    },
    {
      cells: [
        {
          width: 1,
          colour: 2,
          header: 'Version',
          interpretation: singleCellInterpretation(header.version.toString()),
        },
        {
          width: 1,
          colour: 3,
          header: 'Channel Count',
          interpretation: singleCellInterpretation(header.channelCount.toString()),
        },
        {
          width: 2,
          colour: 4,
          header: 'Pre-skip',
          interpretation: singleCellInterpretation(header.preSkip.toString()),
        },
      ],
    },
    {
      cells: [
        {
          width: 4,
          colour: 5,
          header: 'Input Sample Rate',
          interpretation: singleCellInterpretation(header.inputSampleRate.toString()),
        },
      ],
    },
    {
      cells: [
        {
          width: 2,
          colour: 6,
          header: 'Output Gain',
          interpretation: singleCellInterpretation(header.outputGain.toString()),
        },
        {
          width: 1,
          colour: 7,
          header: 'Mapping Family',
          interpretation: singleCellInterpretation(header.channelMappingFamily.toString()),
        },
      ],
    },
  ]
  return <ByteTable dataWindow={header.dataWindow} showHex={showHex} rows={rowSpecs} />
}
