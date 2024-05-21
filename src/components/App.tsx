import React from 'react'

import './App.scss'
import { ShowHexProvider } from './showHexHook'
import { Main } from './Main'

export const App = () => (
  <ShowHexProvider>
    <Main />
  </ShowHexProvider>
)

