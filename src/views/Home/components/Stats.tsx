import React, { useCallback, useEffect, useState } from 'react'

import numeral from 'numeral'
import { Box, Card, CardContent, Spacer } from 'react-neu'

import FancyValue from 'components/FancyValue'
import useTsuki from 'hooks/useTsuki'
import bnb_logo from './bnb_icon.png'
import { bnToDec } from 'utils'
import {
  getCurrentPrice,
} from 'tsuki-sdk/utils';
import useTotalSupply from '../../../hooks/useTotalSupply'

const Stats: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<string>()
  const totalSupply = numeral(useTotalSupply()).format('0,0')
  const tsuki = useTsuki()
  const fetchStats = useCallback(async () => {
    if (!tsuki) return;
    const price = await getCurrentPrice(tsuki)
    setCurrentPrice(numeral(bnToDec(price)).format('0.00a'))
  }, [
    setCurrentPrice,
    tsuki,
  ])
  useEffect(() => {
    fetchStats();
    let refreshInterval = setInterval(fetchStats, 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchStats, tsuki])
  return (
    <Box column>
      <Card>
        <CardContent>
          <FancyValue
            icon={<img src={bnb_logo} alt='BNBC logo' />}
            label='Current price (TWAP)'
            value={currentPrice ? `${currentPrice} BNB` : '--'}
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue icon='🎯' label='Target price' value='1 BNB' />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon={<img src={bnb_logo} alt='BNBC logo' />}
            label='BNBC Supply'
            value={totalSupply !== '0' ? `${totalSupply}` : '--'}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default Stats