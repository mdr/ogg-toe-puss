import React, { useCallback, useEffect, useState } from 'react'
import { OggPage } from '../audio/OggPage'
import { parseOggPages } from '../audio/oggParser'
import { LogicalBitstream, extractBitstreams } from '../audio/packetExtractor'
import { useDropzone } from 'react-dropzone'

import './App.scss'
import { OggPagesTab } from './OggPagesTab'
import { ShowHexProvider, useShowHex } from './showHexHook'
import { BitstreamsTab } from './BitstreamsTab'

const opusFile = `${process.env.PUBLIC_URL}/example_0.opus`

enum AppTab {
  OGG_PAGES = 'OGG_PAGES',
  BITSTREAMS = 'BITSTREAMS',
}

const fetchBinaryFile = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(opusFile)
  const blob = await response.blob()
  return await blob.arrayBuffer()
}

export const App = () => (
  <ShowHexProvider>
    <Main />
  </ShowHexProvider>
)

const Main = () => {
  const [oggPages, setOggPages] = useState<OggPage[]>()
  const [bitstreams, setBitstreams] = useState<LogicalBitstream[]>([])
  const [tab, setTab] = useState<AppTab>(AppTab.OGG_PAGES)
  const { showHex, setShowHex } = useShowHex()
  const importFile = (arrayBuffer: ArrayBuffer) => {
    const oggPages = parseOggPages(arrayBuffer)
    const bitstreams = extractBitstreams(oggPages)
    setOggPages(oggPages)
    setBitstreams(bitstreams)
  }
  useEffect(() => {
    fetchBinaryFile(opusFile).then(importFile)
  }, [])
  return (
    <div className="app">
      <button onClick={() => setTab(AppTab.OGG_PAGES)} disabled={tab === AppTab.OGG_PAGES}>
        Ogg Pages
      </button>
      <button onClick={() => setTab(AppTab.BITSTREAMS)} disabled={tab === AppTab.BITSTREAMS}>
        Logical Bitstreams
      </button>
      <div className="show-hex-checkbox">
        <label htmlFor="showHex">Show Hex</label>
        <input id="showHex" onChange={() => setShowHex(!showHex)} checked={showHex} type="checkbox" />
      </div>
      <Dropzone onDrop={async (file) => importFile(await file.arrayBuffer())} />
      {tab === AppTab.OGG_PAGES && <OggPagesTab oggPages={oggPages ?? []} />}
      {tab === AppTab.BITSTREAMS && <BitstreamsTab streams={bitstreams} />}
    </div>
  )
}

interface DropzoneProps {
  onDrop(file: File): void
}

const Dropzone = ({ onDrop }: DropzoneProps) => {
  const onDropAccepted = useCallback((acceptedFiles: File[]) => onDrop(acceptedFiles[0]), [onDrop])
  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, accept: ['audio/ogg', 'video/ogg', 'application/ogg', 'audio/opus'] })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      Click here or drop an Ogg file to upload
    </div>
  )
}
