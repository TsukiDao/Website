import React, { useMemo, useState } from "react";

import { Box, Button, Container, Separator, Spacer } from "react-neu";

import { useWallet } from "use-wallet";

import Countdown from "react-countdown";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";

import useFarming from "hooks/useFarming";

import HarvestCard0 from "./components/HarvestPool0";
import HarvestCard from "./components/Harvest";
import HarvestCardV1 from "./components/HarvestV1";
import HarvestCard2 from "./components/HarvestPool2";
import HarvestCard2V1 from "./components/HarvestPool2V1";
import HarvestCard3 from "./components/HarvestPool3";
import HarvestCard4 from "./components/HarvestPool4";
import StakeCard0 from "./components/StakePool0";
import StakeCard from "./components/Stake";
import StakeCardV1 from "./components/StakeV1";
import StakeCard2 from "./components/StakePool2";
import StakeCard2V1 from "./components/StakePool2V1";
import StakeCard3 from "./components/StakePool3";
import StakeCard4 from "./components/StakePool4";
import logo from "./components/Harvest/Tsuki_Farm_small.png";
import useFarming2 from "hooks/useFarming2";
import styled from "styled-components";

const Farm: React.FC = () => {
  const { status } = useWallet();
  const { isRedeeming, onRedeem } = useFarming();
  const [farmTab, setFarmTab] = useState<"V1" | "V2">("V2");

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
        <Spacer />
        <Separator />
        {farmTab === "V2" ? (
          <>
            <h3 style={{ display: "flex", justifyContent: "center" }}>
              LP V2 Pools
            </h3>
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
            <Split>
              <StakeCard3 />
              <HarvestCard3 />
            </Split>
            <Split>
              <StakeCard4 />
              <HarvestCard4 />
            </Split>
          </>
        ) : (
          <>
            <h3 style={{ display: "flex", justifyContent: "center" }}>
              LP V1 Legacy Pools
            </h3>
            <Split>
              <StakeCardV1 />
              <HarvestCardV1 />
            </Split>

            <Split>
              <StakeCard2V1 />
              <HarvestCard2V1 />
            </Split>
          </>
        )}
        <Split>
          {/* <Button onClick={() => setFarmTab("V2")} disabled={farmTab === "V2"}>
            V2
          </Button>
          <Button onClick={() => setFarmTab("V1")} disabled={farmTab === "V1"}>
            V1
          </Button> */}
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
        <Spacer />
        <Separator />
        {/* <div style={{display: 'float'}}>Version:</div>
        <Split>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button
            onClick={() => setFarmTab("V2")}
            disabled={farmTab === "V2"}
            variant={farmTab === "V2" ? "default" : "secondary"}
          >
            V2
          </Button>
            </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button
            onClick={() => setFarmTab("V1")}
            disabled={farmTab === "V1"}
            variant={farmTab === "V1" ? "default" : "secondary"}
          >
            V1
          </Button>
          </div>
        </Split> */}
        <StyledVersionsFooter>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <h4>Version:</h4>
          <Spacer />
            <Button
              onClick={() => setFarmTab("V2")}
              disabled={farmTab === "V2"}
              variant={farmTab === "V2" ? "default" : "secondary"}
            >
              V2
            </Button>
          <Spacer />
            <Button
              onClick={() => setFarmTab("V1")}
              disabled={farmTab === "V1"}
              variant={farmTab === "V1" ? "default" : "secondary"}
            >
              V1
            </Button>
            </div>
        </StyledVersionsFooter>
      </Container>
    </Page>
  );
};

export default Farm;

const StyledVersionsFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
`
const StyledVersionsFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 72px;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
`