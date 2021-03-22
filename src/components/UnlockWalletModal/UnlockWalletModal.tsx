import React, { useCallback, useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'
import trustLogo  from 'assets/trust.svg'

import WalletProviderCard from './components/WalletProviderCard'
import Split from 'components/Split'

const UnlockWalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const { account, connect } = useWallet()

  const handleConnectMetamask = useCallback(() => {
    connect('injected')
  }, [connect])

  const handleConnectWalletConnect = useCallback(() => {
    connect('walletconnect')
  }, [connect])

  useEffect(() => {
    if (account) {
      onDismiss && onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Select a wallet provider." />
      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletsInnerWrapper>
          <Split>
          <Box flex={1}>
            <WalletProviderCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              name="Metamask"
              onSelect={handleConnectMetamask}
            />
          </Box>
          <Box flex={2}>
          <WalletProviderCard
              icon={<img src={trustLogo} style={{ height: 32 }} />}
              name="TrustWallet"
              onSelect={handleConnectMetamask}
            />
          </Box>
          </Split>
          <Spacer />
          <Split>
          <WalletProviderCard
              icon={<img src={walletConnectLogo} style={{ height: 32 }} />}
              name="WalletConnect"
              onSelect={handleConnectWalletConnect}
            />
          </Split>
          </StyledWalletsInnerWrapper>
        </StyledWalletsWrapper>
      </ModalContent>
      <ModalActions>
        <Box flex={1} row justifyContent="center">
          <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        </Box>
      </ModalActions>
      </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: none;
    overflow-y: auto;
    height: 60vh;
  }
`
const StyledWalletsInnerWrapper = styled.div`
  flex: 1 1 auto;
`

export default UnlockWalletModal