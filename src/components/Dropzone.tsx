import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export interface DropzoneProps {
  onDrop(file: File): void
}

export const Dropzone = ({ onDrop }: DropzoneProps) => {
  const onDropAccepted = useCallback((acceptedFiles: File[]) => onDrop(acceptedFiles[0]), [onDrop])
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: ['audio/ogg', 'video/ogg', 'application/ogg', 'audio/opus']
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      Click here or drop an Ogg file to upload
    </div>
  )
}