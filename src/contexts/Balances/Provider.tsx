import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  tsuki as tsukiAddress,
  bnbc as bnbcAddress,
  bnbcbnbCakeLP as bnbcbnbCakeLpAddress,
  tsukibnbCakeLP as tsukibnbCakeLpAddress
} from 'constants/tokenAddresses'
import { getBalance } from 'utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [tsukiBalance, setTsuskiBalance] = useState<BigNumber>()
  const [bnbcBalance, setBnbcBalance = useState<BigNumber>()
  const [bnbcbnbCakeLpBalance, setBnbcBnbCakeLpBalance] = useState<BigNumber>()
  const [TsukiBnbCakeLpBalance, setTsukiBnbCakeLpBalance] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    const balances = await Promise.all([
      await getBalance(provider, tsukiAddress, userAddress),
      await getBalance(provider, bnbcAddress, userAddress),
      await getBalance(provider, bnbcbnbCakeLpAddress, userAddress),
      await getBalance(provider, tsukibnbCakeLpAddress, userAddress)
    ])
    setTsukiBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(24)))
    setBnbcBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setTsukiBnbCakeLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
    setBnbcBnbCakeLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
  }, [
    setTsukiBalance,
    setBnbcBalance,
    setTsukiBnbCakeLpBalance,
    setBnbcBnbCkeLpBalance
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }S
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
      TsuskiBalance,
      BnbcBalance,
      TsukiBnbCakeLpBalance,
      BnbcBnbCakeLpBalance,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider