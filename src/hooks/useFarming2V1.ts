import { useContext } from 'react'

import { FarmingContext } from 'contexts/Farming2V1'

const useFarming = () => {
  return { ...useContext(FarmingContext) }
}

export default useFarming