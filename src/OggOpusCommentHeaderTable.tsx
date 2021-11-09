import { OggOpusCommentHeader } from './OggOpusCommentHeader'

export interface OggOpusCommentHeaderTableProps {
  header: OggOpusCommentHeader
  showHex: boolean
}

export const OggOpusCommentHeaderTable = ({ header, showHex }: OggOpusCommentHeaderTableProps) => (
  <table className="comment-header-table byte-table">
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
        <td className="byte-table__header-cell byte-table__cell-style-2" colSpan={4}>Vendor String Length</td>
      </tr>
      {showHex && (
        <tr>
          <td className="byte-table__hex-cell byte-table__cell-style-2">
            {header.getVendorStringLengthHex(0)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-2">
            {header.getVendorStringLengthHex(1)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-2">
            {header.getVendorStringLengthHex(2)}
          </td>
          <td className="byte-table__hex-cell byte-table__cell-style-2">
            {header.getVendorStringLengthHex(3)}
          </td>
        </tr>
      )}
      <tr>
        <td className="byte-table__interpretation-cell byte-table__cell-style-2" colSpan={4}>
          {header.vendorStringLength}
        </td>
      </tr>
            
    </tbody>
  </table>
)
