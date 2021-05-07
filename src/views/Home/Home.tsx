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
import logo from './components/icon_2.png'

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
          <p style={{textAlign: 'center'}}>
            <span>Rebase coming soon!</span>
           {/* <span>Rebase activates in:  </span>
            <Countdown date={'2021-05-07T16:00:00.000+00:00'}>
              <Completionist />
            </Countdown> */}
          </p>
        </Split>
        <Split>
          <Rebase />
          <Stats />
        </Split>
      </Container>
    </Page>
  )
}

export default Home