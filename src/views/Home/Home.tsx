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

import Rebase from './components/Rebase'
import Stats from './components/Stats'
import logo from './components/icon_2.png'

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { tsukiBalance, bnbcBalance } = useBalances()
  return (
    <Page>
      <PageHeader
        icon={darkMode ? <img src={logo} /> : <img src={logo} />}
        subtitle={darkMode !? "🤫 shhh... the Moon is sleeping." : "It's a great day to farm BNBcash!"}
        title="Welcome to Tsuki Finance."
      />
      <Container>
        {(tsukiBalance && bnbcBalance) && (
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