import { useContext } from 'react'

import { FarmingContext } from 'contexts/FarmingV1'

const useFarming = () => {
  return { ...useContext(FarmingContext) }
}

export default useFarming