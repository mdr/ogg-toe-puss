
export const asHexString = (buffer: ArrayBuffer): string => Array.from(new Uint8Array(buffer)).map(asHexPair).join("")

export const asHexPair = (n: number): string => ('0' + n.toString(16)).slice(-2)
