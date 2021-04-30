import BigNumber from 'bignumber.js'
import { useEffect, useState } from "react";
import { getLastRebaseTimestamp } from "../tsuki-sdk/utils/index";
import useTsuki from "./useTsuki";

const useLastRebaseTimestamp = () => {
  const [lastRebaseTimestamp, setLastRebaseTimestamp] = useState(new BigNumber(0));
  const tsuki = useTsuki();

  const fetchLastRebaseTimestamp = async () => {
    if (!tsuki) {
      return false;
    }

    try {
      setLastRebaseTimestamp(await getLastRebaseTimestamp(tsuki));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLastRebaseTimestamp();
  }, [tsuki]);

  return lastRebaseTimestamp;
};

export default useLastRebaseTimestamp;
