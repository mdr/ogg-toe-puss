import React, { ReactNode, useContext, useState } from 'react'

export interface ShowHexContextContents {
  showHex: boolean

  setShowHex(show: boolean): void
}

const ShowHexContext = React.createContext<ShowHexContextContents>({
  showHex: false,
  setShowHex: () => undefined
})

export const useShowHex = (): ShowHexContextContents => useContext(ShowHexContext)

export const ShowHexProvider = ({ children }: { children?: ReactNode | undefined }) => {
  const [showHex, setShowHex] = useState<boolean>(false)
  const showHexContents = { showHex, setShowHex }
  return <ShowHexContext.Provider value={showHexContents}>{children}</ShowHexContext.Provider>
}
