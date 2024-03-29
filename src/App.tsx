import React, { useCallback, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "react-neu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";

import MobileMenu from "components/MobileMenu";
import TopBar from "components/TopBar";

import { BalancesProvider } from "contexts/Balances";
import { FarmingProvider } from "contexts/Farming";
import { Farming2Provider } from "contexts/Farming2";
import { Farming3Provider } from "contexts/Farming3";
import { Farming4Provider } from "contexts/Farming4";
import TsukiProvider from "contexts/TsukiProvider";

import Farm from "views/Farm";
import FAQ from "views/FAQ";
import Home from "views/Home";
import { Farming0Provider } from "contexts/Farming0";
import { FarmingV1Provider } from "./contexts/FarmingV1";
import { Farming2V1Provider } from "./contexts/Farming2V1";

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false);
  }, [setMobileMenu]);

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true);
  }, [setMobileMenu]);

  return (
    <Router>
      <Providers>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/farm">
            <Farm />
          </Route>
          <Route exact path="/faq">
            <FAQ />
          </Route>
        </Switch>
      </Providers>
    </Router>
  );
};

const Providers: React.FC = ({ children }) => {
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme({
      baseColor: { h: 338, s: 100, l: 41 },
      baseColorDark: { h: 339, s: 89, l: 49 },
      borderRadius: 28,
    });
  }, []);
  return (
    <ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
      <UseWalletProvider
        chainId={56}
        connectors={{
          walletconnect: { rpcUrl: "https://bridge.walletconnect.org" },
        }}
      >
        <TsukiProvider>
          <BalancesProvider>
            <Farming0Provider>
              <FarmingProvider>
                <FarmingV1Provider>
                  <Farming2Provider>
                    <Farming2V1Provider>
                      <Farming3Provider>
                        <Farming4Provider>{children}</Farming4Provider>
                      </Farming3Provider>
                    </Farming2V1Provider>
                  </Farming2Provider>
                </FarmingV1Provider>
              </FarmingProvider>
            </Farming0Provider>
          </BalancesProvider>
        </TsukiProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
