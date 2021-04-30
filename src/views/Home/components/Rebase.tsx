import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Spacer } from 'react-neu'
import { bnToDec } from 'utils'

import {
  getMinRebaseTimeIntervalSec,
  getLastRebaseTimestamp,
} from 'tsuki-sdk/utils'

import Dial from 'components/Dial'
import useTsuki from '../../../hooks/useTsuki'
import useRebase from '../../../hooks/useRebase'
import useInRebaseWindow from '../../../hooks/useInRebaseWindow'
import useLastRebaseTimestamp from '../../../hooks/useLastRebaseTimestamp'
import useMinRebaseTimeIntervalSec from '../../../hooks/useMinRebaseTimeIntervalSec'

const Rebase: React.FC = () => {
  const { onRebase } = useRebase()
  const [nextRebaseInterval, setNextRebaseInterval] = useState(0)
  const minRebaseTimeIntervalSec = bnToDec(useMinRebaseTimeIntervalSec());
  const lastRebaseTimestamp = bnToDec(useLastRebaseTimestamp());
  const tsuki = useTsuki()
  const fetchStats = useCallback(async () => {
    if (!tsuki) return

    const now = Math.floor(Date.now() / 1000);
    const timeSinceLastRebase = now - lastRebaseTimestamp
    const timeTillNextRebase = minRebaseTimeIntervalSec - timeSinceLastRebase < 0 ? 0 : minRebaseTimeIntervalSec - timeSinceLastRebase
    setNextRebaseInterval(timeTillNextRebase)
  }, [tsuki])

  useEffect(() => {
    fetchStats()
    let refreshInterval = setInterval(fetchStats, 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchStats, tsuki])

  const rebasePercentage = tsuki ? 100 - (nextRebaseInterval / minRebaseTimeIntervalSec) * 100 : 0
  const inRebaseWindow = useInRebaseWindow()
  return (
    <Card>
      <CardContent>
        <Box alignItems='center' justifyContent='center' row>
          <Dial size={240} value={rebasePercentage}></Dial>
        </Box>
        <Spacer />
        <Button
          disabled={rebasePercentage < 100 || !inRebaseWindow}
          onClick={onRebase}
          text='Rebase'
          variant='secondary'
        />
      </CardContent>
    </Card>
  )
}

export default Rebase