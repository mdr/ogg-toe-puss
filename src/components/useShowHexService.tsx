import React, { ReactNode, useContext, useState } from 'react'

export interface ShowHexService {
  showHex: boolean

  setShowHex(show: boolean): void
}

const ShowHexServiceContext = React.createContext<ShowHexService>({
  showHex: false,
  setShowHex: () => undefined
})

export const useShowHexService = (): ShowHexService => useContext(ShowHexServiceContext)

export const ShowHexServiceProvider = ({ children }: { children?: ReactNode | undefined }) => {
  const [showHex, setShowHex] = useState<boolean>(false)
  const showHexService: ShowHexService = { showHex, setShowHex }
  return <ShowHexServiceContext.Provider value={showHexService}>{children}</ShowHexServiceContext.Provider>
}
