import React, { useCallback, useEffect, useState } from 'react'

import numeral from 'numeral'
import {
  Box,
  Card,
  CardContent,
  Spacer,
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import useTsuki from 'hooks/useTsuki'
import bnb_logo from "./bnb_icon.png"
import { bnToDec } from 'utils'
import {
  getCurrentPrice,
  getScalingFactor,
} from 'tsuki-sdk/utils'

const Stats: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<string>()
  const [scalingFactor, setScalingFactor] = useState<string>()
  const tsuki = useTsuki()
  const fetchStats = useCallback(async () => {
    if (!tsuki) return
    const price = await getCurrentPrice(tsuki)
    const factor = await getScalingFactor(tsuki)
    setCurrentPrice(numeral(bnToDec(price)).format('0.00a'))
    setScalingFactor(numeral(bnToDec(factor)).format('0.00a'))
  }, [
    setCurrentPrice,
    setScalingFactor,
    tsuki,
  ])
  useEffect(() => {
    fetchStats()
    let refreshInterval = setInterval(fetchStats, 10000)
    return () => clearInterval(refreshInterval)
  }, [
    fetchStats,
    tsuki
  ])
  return (
    <Box column>
      <Card>
        <CardContent>
          <FancyValue
            icon= {<img src={bnb_logo} />}
            label="Current price (TWAP)"
            value={currentPrice ? currentPrice : '--'}
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon="🎯"
            label="Target price"
            value="1 BNB"
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon="🚀"
            label="Scaling factor"
            value={scalingFactor ? scalingFactor : '--'}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default Stats