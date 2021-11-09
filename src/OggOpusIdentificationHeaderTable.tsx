import { OggOpusIdentificationHeader } from './OggOpusIdentificationHeader'

export interface OggOpusIdentificationHeaderTableProps {
  header: OggOpusIdentificationHeader
  showHex: boolean
}

export const OggOpusIdentificationHeaderTable = ({ header, showHex }: OggOpusIdentificationHeaderTableProps) => (
  <table className="id-header-table byte-table">
    <tbody>
      <tr>
        <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          0-3
        </th>
        <td className="byte-table__header-cell byte-table__cell-style-1" colSpan={4}>
          Magic Signature
        </td>
      </tr>
      {showHex && (
        <tr>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(0)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(1)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(2)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[0]}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[1]}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[2]}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[3]}
        </td>
      </tr>

      <tr>
        <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          4-7
        </th>
        <td className="byte-table__header-cell byte-table__cell-style-1" colSpan={4}>&nbsp;</td>
      </tr>
      {showHex && (
        <tr>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(0)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(1)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(2)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-1">
            {header.getMagicSignatureHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[4]}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[5]}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[6]}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-1">
          {header.magicSignature[7]}
        </td>
      </tr>
      
      <tr>
        <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          8-11
        </th>
        <td className="byte-table__header-cell byte-table__cell-style-2">Version</td>
        <td className="byte-table__header-cell byte-table__cell-style-3 byte-table__starts-mid-table">Channel Count</td>
        <td className="byte-table__header-cell byte-table__cell-style-4 byte-table__starts-mid-table" colSpan={2}>Pre-skip</td>
      </tr>
      {showHex && (
        <tr>
          <td className="byte-table__hex-cell byte-table__cell-style-2">
            {header.versionHex}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-3 byte-table__starts-mid-table">
            {header.channelCountHex}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-4 byte-table__starts-mid-table">
            {header.getPreSkipHex(0)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-4">
            {header.getPreSkipHex(1)}
          </td>
        </tr>
      )}
      <tr>
        <td className="byte-table__interpretation-cell byte-table__cell-style-2">
          {header.version}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-3 byte-table__starts-mid-table">
          {header.channelCount}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-4 byte-table__starts-mid-table" colSpan={2}>
          {header.preSkip}
        </td>
      </tr>

      <tr>
        <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          12-15
        </th>
        <td className="byte-table__header-cell byte-table__cell-style-5" colSpan={4}>Input Sample Rate</td>
      </tr>
      {showHex && (
        <tr>
          <td className="byte-table__hex-cell byte-table__cell-style-5">
            {header.getInputSampleRateHex(0)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-5">
            {header.getInputSampleRateHex(1)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-5">
            {header.getInputSampleRateHex(2)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-5">
            {header.getInputSampleRateHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="byte-table__interpretation-cell byte-table__cell-style-5" colSpan={4}>
          {header.inputSampleRate}
        </td>
      </tr>

      <tr>
        <th className="byte-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          16-19
        </th>
        <td className="byte-table__header-cell byte-table__cell-style-6" colSpan={2}>Output Gain</td>
        <td className="byte-table__header-cell byte-table__cell-style-7 byte-table__starts-mid-table byte-table__border-right">Mapping Family</td>
      </tr>
      {showHex && (
        <tr>
          <td className="byte-table__hex-cell byte-table__cell-style-6">
            {header.getOutputGainHex(0)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-6">
            {header.getOutputGainHex(1)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-7 byte-table__starts-mid-table byte-table__border-right">
            {header.channelMappingFamilyHex}
          </td>
        </tr>
      )}
      <tr>
        <td className="byte-table__interpretation-cell byte-table__cell-style-6" colSpan={2}>
          {header.outputGain}
        </td>
        <td className="byte-table__interpretation-cell byte-table__cell-style-7 byte-table__starts-mid-table byte-table__border-right">
          {header.channelMappingFamily}
        </td>
      </tr>
    </tbody>
  </table>
)
