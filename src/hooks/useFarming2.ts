import { useContext } from 'react'

import { FarmingContext } from 'contexts/Farming2'

const useFarming2 = () => {
  return { ...useContext(FarmingContext) }
}

export default useFarming2