import BigNumber from 'bignumber.js'

export interface ContextValues {
  tsukiBalance?: BigNumber,
  bnbcBalance?: BigNumber,
  tsukiBnbLpBalance?: BigNumber,
  bnbcBnbLpBalance?: BigNumber
}