import { useContext } from 'react'

import { Farming0Context } from 'contexts/Farming0'

const useFarming0 = () => {
  return { ...useContext(Farming0Context) }
}

export default useFarming0