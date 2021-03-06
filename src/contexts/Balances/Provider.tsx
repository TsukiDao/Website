import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  tsuki as tsukiAddress,
  bnbc as bnbcAddress,
  bnbcbnbCakeLP as bnbcBnbCakeLpAddress,
  tsukibnbCakeLP as tsukiBnbCakeLpAddress
} from 'constants/tokenAddresses'
import { getBalance } from 'utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [tsukiBalance, setTsukiBalance] = useState<BigNumber>()
  const [bnbcBalance, setBnbcBalance] = useState<BigNumber>()
  const [tsukiBnbLpBalance, setTsukiBnbLpBalance] = useState<BigNumber>()
  const [bnbcBnbLpBalance, setBnbcBnbLpBalance] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    const balances = await Promise.all([
      await getBalance(provider, tsukiAddress, userAddress),
      await getBalance(provider, bnbcAddress, userAddress),
      await getBalance(provider, tsukiBnbCakeLpAddress, userAddress),
      await getBalance(provider, bnbcBnbCakeLpAddress, userAddress),
    ])
    setTsukiBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18)))
    setBnbcBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setTsukiBnbLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
    setBnbcBnbLpBalance(new BigNumber(balances[3]).dividedBy(new BigNumber(10).pow(18)))
  }, [
    setTsukiBalance,
    setBnbcBalance,
    setTsukiBnbLpBalance,
    setBnbcBnbLpBalance
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
      bnbcBnbLpBalance
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider