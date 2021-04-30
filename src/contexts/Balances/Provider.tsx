import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  tsuki as tsukiAddress,
  bnbc as bnbcAddress,
  bnbcbnbCakeLP as bnbcBnbCakeLpAddress,
  tsukibnbCakeLP as tsukiBnbCakeLpAddress,
  treatBnbLp as treatBnbLpAddress,
  cake as cakeAddress,
  bnbcbnbCakeLPV1 as bnbcBnbCakeLpV1Address,
  tsukibnbCakeLPV1 as tsukiBnbCakeLpV1Address,
} from 'constants/tokenAddresses'
import { getBalance } from 'utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [tsukiBalance, setTsukiBalance] = useState<BigNumber>()
  const [bnbcBalance, setBnbcBalance] = useState<BigNumber>()
  const [tsukiBnbLpBalance, setTsukiBnbLpBalance] = useState<BigNumber>()
  const [bnbcBnbLpBalance, setBnbcBnbLpBalance] = useState<BigNumber>()
  const [treatBnbLpBalance, setTreatBnbLpBalance] = useState<BigNumber>()
  const [cakeBalance, setCakeBalance] = useState<BigNumber>()

  const [tsukiBnbLpV1Balance, setTsukiBnbLpV1Balance] = useState<BigNumber>()
  const [bnbcBnbLpV1Balance, setBnbcBnbLpV1Balance] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    const balances = await Promise.all([
      await getBalance(provider, tsukiAddress, userAddress),
      await getBalance(provider, bnbcAddress, userAddress),
      await getBalance(provider, tsukiBnbCakeLpAddress, userAddress),
      await getBalance(provider, bnbcBnbCakeLpAddress, userAddress),

      await getBalance(provider, treatBnbLpAddress, userAddress),
      await getBalance(provider, cakeAddress, userAddress),

      await getBalance(provider, tsukiBnbCakeLpV1Address, userAddress),
      await getBalance(provider, bnbcBnbCakeLpV1Address, userAddress),
    ])
    setTsukiBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18)))
    setBnbcBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setTsukiBnbLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
    setBnbcBnbLpBalance(new BigNumber(balances[3]).dividedBy(new BigNumber(10).pow(18)))

    setTreatBnbLpBalance(new BigNumber(balances[4]).dividedBy(new BigNumber(10).pow(18)))
    setCakeBalance(new BigNumber(balances[5]).dividedBy(new BigNumber(10).pow(18)))

    setTsukiBnbLpV1Balance(new BigNumber(balances[6]).dividedBy(new BigNumber(10).pow(18)))
    setBnbcBnbLpV1Balance(new BigNumber(balances[7]).dividedBy(new BigNumber(10).pow(18)))
  }, [
    setTsukiBalance,
    setBnbcBalance,
    setTsukiBnbLpBalance,
    setBnbcBnbLpBalance,
    setTsukiBnbLpV1Balance,
    setBnbcBnbLpV1Balance,
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  return (
    <Context.Provider value={{
      tsukiBalance,
      bnbcBalance,
      tsukiBnbLpBalance,
      bnbcBnbLpBalance,

      treatBnbLpBalance,
      cakeBalance,

      tsukiBnbLpV1Balance,
      bnbcBnbLpV1Balance,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider