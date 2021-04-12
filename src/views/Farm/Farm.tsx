import React, { useMemo } from "react";

import { Box, Button, Container, Separator, Spacer } from "react-neu";

import { useWallet } from "use-wallet";

import Countdown from 'react-countdown';


import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";


import useFarming from "hooks/useFarming";

import HarvestCard0 from "./components/HarvestPool0";
import StakeCard0 from "./components/StakePool0";
import HarvestCard from "./components/Harvest";
import HarvestCard2 from "./components/HarvestPool2";
import StakeCard from "./components/Stake";
import StakeCard2 from "./components/StakePool2";
import logo from "./components/Harvest/Tsuki_Farm_small.png";
import useFarming2 from "hooks/useFarming2";

const Farm: React.FC = () => {
  const { status } = useWallet();
  const { isRedeeming, onRedeem } = useFarming();

  const RedeemButton = useMemo(() => {
    if (status !== "connected") {
      return (
        <Button disabled text="Harvest &amp; Unstake" variant="secondary" />
      );
    }
    if (!isRedeeming) {
      return (
        <Button
          onClick={onRedeem}
          text="Harvest &amp; Unstake"
          variant="secondary"
        />
      );
    }
    return <Button disabled text="Redeeming..." variant="secondary" />;
  }, [isRedeeming, onRedeem]);

  const { isRedeeming: isRedeeming2, onRedeem: onRedeem2 } = useFarming2();

  const RedeemButton2 = useMemo(() => {
    if (status !== "connected") {
      return (
        <Button disabled text="Harvest &amp; Unstake" variant="secondary" />
      );
    }
    if (!isRedeeming2) {
      return (
        <Button
          onClick={onRedeem2}
          text="Harvest &amp; Unstake"
          variant="secondary"
        />
      );
    }
    return <Button disabled text="Redeeming..." variant="secondary" />;
  }, [isRedeeming2, onRedeem2]);

  const Completionist = () => <span>You are good to go!</span>;


  return (
    <Page>
      <PageHeader
        icon={<img src={logo} />}
        subtitle="Stake tokens and grow BNB CASH"
        title="Farm"
      />
      <Container>
        <Split>
          <StakeCard0 />
          <HarvestCard0 />
        </Split>
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Split>
          <StakeCard2 />
          <HarvestCard2 />
        </Split>
        <Spacer />
        <Separator />
        <Split>
          <Button
            full
            text="Buy TSUKI"
            href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x3fd9e7041c45622e8026199a46f763c9807f66f3"
            variant="tertiary"
          />
          <Button
            full
            text="Buy BNBC"
            href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x31B5d91806AF3364678715f4C5Bf50c1e3bAE10A"
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
  );
};

export default Farm;
