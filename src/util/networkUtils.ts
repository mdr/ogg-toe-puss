export const fetchBinaryFile = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url)
  const blob = await response.blob()
  return await blob.arrayBuffer()
}
