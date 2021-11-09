import { OggOpusIdentificationHeader } from './OggOpusIdentificationHeader'

export interface OggOpusIdentificationHeaderTableProps {
  header: OggOpusIdentificationHeader
  showHex: boolean
}

export const OggOpusIdentificationHeaderTable = ({ header, showHex }: OggOpusIdentificationHeaderTableProps) => (
  <table className="id-header-table">
    <tbody>
      <tr>
        <th className="ogg-page-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          0-3
        </th>
        <td className="ogg-page-table__header-cell ogg-page-table__capture-pattern-cell" colSpan={4}>
          Magic Signature
        </td>
      </tr>
      {showHex && (
        <tr>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(0)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(1)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(2)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[0]}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[1]}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[2]}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[3]}
        </td>
      </tr>

      <tr>
        <th className="ogg-page-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          4-7
        </th>
        <td className="ogg-page-table__header-cell ogg-page-table__capture-pattern-cell" colSpan={4}>&nbsp;</td>
      </tr>
      {showHex && (
        <tr>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(0)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(1)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(2)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__capture-pattern-cell">
            {header.getMagicSignatureHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[4]}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[5]}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[6]}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__capture-pattern-cell">
          {header.magicSignature[7]}
        </td>
      </tr>
      
      <tr>
        <th className="ogg-page-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          8-11
        </th>
        <td className="ogg-page-table__header-cell ogg-page-table__version-cell">Version</td>
        <td className="ogg-page-table__header-cell ogg-page-table__header-type-cell">Channel Count</td>
        <td className="ogg-page-table__header-cell ogg-page-table__granule-position-cell" colSpan={2}>Pre-skip</td>
      </tr>
      {showHex && (
        <tr>
          <td className="ogg-page-table__hex-cell ogg-page-table__version-cell">
            {header.versionHex}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__header-type-cell">
            {header.channelCountHex}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__granule-position-cell">
            {header.getPreSkipHex(0)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__granule-position-cell">
            {header.getPreSkipHex(1)}
          </td>
        </tr>
      )}
      <tr>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__version-cell">
          {header.version}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__header-type-cell">
          {header.channelCount}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__granule-position-cell" colSpan={2}>
          {header.preSkip}
        </td>
      </tr>

      <tr>
        <th className="ogg-page-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          12-15
        </th>
        <td className="ogg-page-table__header-cell ogg-page-table__bitstream-serial-number-cell" colSpan={4}>Input Sample Rate</td>
      </tr>
      {showHex && (
        <tr>
          <td className="ogg-page-table__hex-cell ogg-page-table__bitstream-serial-number-cell">
            {header.getInputSampleRateHex(0)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__bitstream-serial-number-cell">
            {header.getInputSampleRateHex(1)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__bitstream-serial-number-cell">
            {header.getInputSampleRateHex(2)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__bitstream-serial-number-cell">
            {header.getInputSampleRateHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__bitstream-serial-number-cell" colSpan={4}>
          {header.inputSampleRate}
        </td>
      </tr>

      <tr>
        <th className="ogg-page-table__byte-header-cell" rowSpan={showHex ? 3 : 2}>
          16-19
        </th>
        <td className="ogg-page-table__header-cell ogg-page-table__page-sequence-number-cell" colSpan={2}>Output Gain</td>
        <td className="ogg-page-table__header-cell ogg-page-table__crc-checksum-cell">Mapping Family</td>
      </tr>
      {showHex && (
        <tr>
          <td className="ogg-page-table__hex-cell ogg-page-table__page-sequence-number-cell">
            {header.getOutputGainHex(0)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__page-sequence-number-cell">
            {header.getOutputGainHex(1)}
          </td>
          <td className="ogg-page-table__hex-cell ogg-page-table__crc-checksum-cell">
            {header.channelMappingFamilyHex}
          </td>
        </tr>
      )}
      <tr>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__page-sequence-number-cell" colSpan={2}>
          {header.outputGain}
        </td>
        <td className="ogg-page-table__interpretation-cell ogg-page-table__crc-checksum-cell">
          {header.channelMappingFamily}
        </td>
      </tr>
    </tbody>
  </table>
)
