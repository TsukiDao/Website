import React from 'react'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'
import useVesting from 'hooks/useVesting'

import MigrationNotice from './components/MigrationNotice'
import Rebase from './components/Rebase'
import Stats from './components/Stats'
import VestingNotice from './components/VestingNotice'
import logo from './components/icon_2.png'

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { yamV2Balance } = useBalances()
  const { vestedBalance } = useVesting()
  return (
    <Page>
      <PageHeader
        icon={darkMode ? <img src={logo} /> : <img src={logo} />}
        subtitle={darkMode !? "🤫 shhh... the Moon is sleeping." : "It's a great day to farm BNBcash!"}
        title="Welcome to Tsuki Finance."
      />
      <Container>
        {(yamV2Balance && yamV2Balance.toNumber() > 0) && (
          <>
            <MigrationNotice />
            <Spacer />
          </>
        )}
        {(vestedBalance && vestedBalance.toNumber() > 0) && (
          <>
            <VestingNotice />
            <Spacer />
          </>
        )}
        <Split>
          <Rebase />
          <Stats />
        </Split>
      </Container>
    </Page>
  )
}

export default Home