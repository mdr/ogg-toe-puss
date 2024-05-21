import React, { ReactNode, useContext, useState } from 'react'

export interface ShowHexContextContents {
  showHex: boolean

  setShowHex(b: boolean): void
}

const ShowHexContext = React.createContext<ShowHexContextContents>({
  showHex: false,
  setShowHex: () => undefined
})

export const useShowHex = (): ShowHexContextContents => useContext(ShowHexContext)

export const ShowHexProvider = ({ children }: { children?: ReactNode | undefined }) => {
  const [showHex, setShowHex] = useState<boolean>(false)

  return <ShowHexContext.Provider value={{ showHex, setShowHex }}>{children}</ShowHexContext.Provider>
}
