import React, { useMemo } from 'react'
import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming0 from 'hooks/useFarming0'

import { bnToDec } from 'utils'

const Harvest: React.FC = () => {
  const {
    earnedBalance,
    isHarvesting,
    isRedeeming,
    onHarvest,
  } = useFarming0()

  const { status } = useWallet()

  const HarvestAction = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Harvest"
          variant="secondary"
        />
      )
    }
    if (!isHarvesting) {
      return (
        <Button
          full
          onClick={onHarvest}
          text="Harvest"
        />
      )
    }
    if (isHarvesting) {
      return (
        <Button
          disabled
          full
          text="Harvesting..."
          variant="secondary"
        />
      )
    }
  }, [
    isHarvesting,
    isRedeeming,
    onHarvest,
  ])

  const formattedEarnedBalance = useMemo(() => {
    if (earnedBalance) {
      return numeral(bnToDec(earnedBalance)).format('0.000a')
    } else {
      return '--'
    }
  }, [earnedBalance])

  return (
    <Card>
      <CardIcon>🌕</CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value={formattedEarnedBalance} />
          <Label text="Unharvested BNB Cash" />
        </Box>
      </CardContent>
      <CardActions>
        {HarvestAction}
      </CardActions>
    </Card>
  )
}

export default Harvest