import BigNumber from 'bignumber.js'

export interface ContextValues {
  tsukiBalance?: BigNumber,
  bnbcBalance?: BigNumber,
  tsukiBnbLpBalance?: BigNumber,
  bnbcBnbLpBalance?: BigNumber,

  tsukiBnbLpV1Balance?: BigNumber,
  bnbcBnbLpV1Balance?: BigNumber,
}