export const asHexString = (buffer: ArrayBuffer, space: boolean = false): string =>
  Array.from(new Uint8Array(buffer))
    .map(asHexPair)
    .join(space ? ' ' : '')

export const asHexPair = (n: number): string => ('0' + n.toString(16)).slice(-2)
