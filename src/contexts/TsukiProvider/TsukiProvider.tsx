import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Tsuki } from 'tsuki-sdk/lib'

export interface TsukiContext {
  tsuki?: any
}

export const Context = createContext<TsukiContext>({
  tsuki: undefined,
})

declare global {
  interface Window {
    tsukisauce: any
  }
}

const TsukiProvider: React.FC = ({ children }) => {
  const { ethereum } = useWallet()
  const [tsuki, setTsuki] = useState<any>()

  useEffect(() => {
    if (ethereum) {
      const TsukiLib = new Tsuki(
        ethereum,
        "56",
        false, {
          defaultAccount: "",
          defaultConfirmations: 1,
          autoGasMultiplier: 1.5,
          testing: false,
          defaultGas: "6000000",
          defaultGasPrice: "1000000000000",
          accounts: [],
          ethereumNodeTimeout: 10000
        }
      )

      setTsuki(tsukiLib)
      window.tsukisauce = tsukiLib
    }
  }, [ethereum])

  return (
    <Context.Provider value={{ tsuki }}>
      {children}
    </Context.Provider>
  )
}

export default TsukiProvider
