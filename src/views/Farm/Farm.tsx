import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import { useWallet } from 'use-wallet'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useFarming from 'hooks/useFarming'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'


const Farm: React.FC = () => {
  const { status } = useWallet()
  const {
    isRedeeming,
    onRedeem,
  } = useFarming()

  const RedeemButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          text="Harvest &amp; Unstake"
          variant="secondary"
        />
      )
    }
    if (!isRedeeming) {
      return (
        <Button
          onClick={onRedeem}
          text="Harvest &amp; Unstake"
          variant="secondary"
        />
      )
    }
    return (
      <Button
        disabled
        text="Redeeming..."
        variant="secondary"
      />
    )
  }, [
    isRedeeming,
    onRedeem,
  ])

  return (
    <Page>
      <PageHeader
        icon="🌙"
        subtitle="Stake TSUKI/BNB LP tokens and grow BNB CASH"
        title="Farm"
      />
      <Container>
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Split>
        <StakeCard />
        <HarvestCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {RedeemButton}
        </Box>
        <Spacer size="lg" />
        <Separator />
        <Spacer size="lg" />
        <Split>
          <Button
            full
            text="Buy TSUKI"
            href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x3fd9e7041c45622e8026199a46f763c9807f66f3"
            variant="tertiary"
          />

          <Button
            full
            text="Get TSUKI/BNB LP tokens"
            href="https://exchange.pancakeswap.finance/#/add/0x3fd9e7041c45622e8026199a46f763c9807f66f3/ETH"
            variant="tertiary"
          />
        </Split>
      </Container>
    </Page>
  )
}

export default Farm