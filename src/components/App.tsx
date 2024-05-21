import React from 'react'

import './App.scss'
import { ShowHexServiceProvider } from './useShowHexService'
import { Main } from './Main'

export const App = () => (
  <ShowHexServiceProvider>
    <Main />
  </ShowHexServiceProvider>
)
