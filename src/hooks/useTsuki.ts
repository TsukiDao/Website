import { useContext } from 'react'
import { Context } from '../contexts/TsukiProvider'

const useTsuki = () => {
  const { tsuki } = useContext(Context)
  return tsuki
}

export default useTsuki