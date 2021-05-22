import React from 'react'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'
import Countdown from 'react-countdown';

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'

import Rebase from './components/Rebase'
import Stats from './components/Stats'
import logo from '../../components/Logo/TSUKI-WEBSITE-CENTER-100X100.png'

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { tsukiBalance } = useBalances()

  const Completionist = () => <span>You are good to go!</span>;

  return (
    <Page>
      <PageHeader
        icon={darkMode ? <img src={logo} /> : <img src={logo} />}
        subtitle={darkMode !? "🤫 shhh... the Moon is sleeping." : "It's a great day to farm BNBcash!"}
        title="Welcome to Tsuki Finance."
      />
      <Container>
        {(tsukiBalance && tsukiBalance.toNumber() >0) && (
          <>
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