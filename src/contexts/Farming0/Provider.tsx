import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import useApproval from 'hooks/useApproval'
import useTsuki from 'hooks/useTsuki'

import {
  getEarned,
  getStaked,
  harvest,
  redeem,
  stake,
  unstake,
} from 'tsuki-sdk/utils'

import Context from './Context'

const farmingStartTime = 1600545500*1000

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [countdown, setCountdown] = useState<number>()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const [earnedBalance, setEarnedBalance] = useState<BigNumber>()
  const [stakedBalance, setStakedBalance] = useState<BigNumber>()

  const tsuki = useTsuki()
  const { account } = useWallet()
  
  const  tsukiPoolAddress = tsuki ? tsuki.contracts.tsukiPool.options.address : ''
  const tsukiAddress = tsuki ? tsuki.contracts.tsuki.options.address : ''

  const { isApproved, isApproving, onApprove } = useApproval(
    tsukiAddress,
    tsukiPoolAddress,
    () => setConfirmTxModalIsOpen(false)
  )

  const fetchEarnedBalance = useCallback(async () => {
    if (!account || !tsuki) return
    const balance = await getEarned(tsuki, tsuki.contracts.tsukiPool, account)
    setEarnedBalance(balance)
  }, [
    account,
    setEarnedBalance,
    tsuki
  ])

  const fetchStakedBalance = useCallback(async () => {
    if (!account || !tsuki) return

    const balance = await getStaked(tsuki, tsuki.contracts.tsukiPool, account)
    setStakedBalance(balance)
  }, [
    account,
    setStakedBalance,
    tsuki
  ])

  const fetchBalances = useCallback(async () => {
    fetchEarnedBalance()
    fetchStakedBalance()
  }, [
    fetchEarnedBalance,
    fetchStakedBalance,
  ])

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])

  const handleHarvest = useCallback(async () => {
    if (!tsuki) return
    setConfirmTxModalIsOpen(true)
    await harvest(tsuki, 'tsuki', account, () => {
      setConfirmTxModalIsOpen(false)
      setIsHarvesting(true)
    })
    setIsHarvesting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    tsuki
  ])

  const handleRedeem = useCallback(async () => {
    if (!tsuki) return
    setConfirmTxModalIsOpen(true)
    await redeem(tsuki, 'tsuki', account, () => {
      setConfirmTxModalIsOpen(false)
      setIsRedeeming(true)
    })
    setIsRedeeming(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    tsuki
  ])

  const handleStake = useCallback(async (amount: string) => {
    if (!tsuki) return
    setConfirmTxModalIsOpen(true)
    await stake(tsuki, 'tsuki', amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsStaking(true)
    })
    setIsStaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    tsuki
  ])

  const handleUnstake = useCallback(async (amount: string) => {
    if (!tsuki) return
    setConfirmTxModalIsOpen(true)
    await unstake(tsuki, 'tsuki', amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsUnstaking(true)
    })
    setIsUnstaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsUnstaking,
    tsuki
  ])

  useEffect(() => {
    fetchBalances()
    let refreshInterval = setInterval(() => fetchBalances(), 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchBalances])

  useEffect(() => {
    let refreshInterval = setInterval(() => setCountdown(farmingStartTime - Date.now()), 1000)
    return () => clearInterval(refreshInterval)
  }, [setCountdown])

  return (
    <Context.Provider value={{
      farmingStartTime,
      countdown,
      earnedBalance,
      isApproved,
      isApproving,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onApprove: handleApprove,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
      stakedBalance,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider