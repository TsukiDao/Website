import BigNumber from 'bignumber.js'
import { useEffect, useState } from "react";
import { getMinRebaseTimeIntervalSec } from "../tsuki-sdk/utils/index";
import useTsuki from "./useTsuki";

const useMinRebaseTimeIntervalSec = () => {
  const [minRebaseTimeIntervalSec, setMinRebaseTimeIntervalSec] = useState(new BigNumber(0));
  const tsuki = useTsuki();

  const fetchMinRebaseTimeIntervalSec = async () => {
    if (!tsuki) {
      return false;
    }

    try {
      setMinRebaseTimeIntervalSec(await getMinRebaseTimeIntervalSec(tsuki));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMinRebaseTimeIntervalSec();
  }, [tsuki]);

  return minRebaseTimeIntervalSec;
};

export default useMinRebaseTimeIntervalSec;
