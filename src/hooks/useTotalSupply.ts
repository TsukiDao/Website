import { useEffect, useState } from "react";
import { getTotalSupply } from "../tsuki-sdk/utils/index";
import { bnToDec } from "utils";
import useTsuki from "./useTsuki";
import BigNumber from "bignumber.js";

const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const tsuki = useTsuki();

  useEffect(() => {
    const fetchSupply = async () => {
      const supply = await getTotalSupply(tsuki);
      setTotalSupply(supply);
    };
    if (tsuki) {
      fetchSupply();
    }
    let refreshInterval = setInterval(fetchSupply, 10000);
    return () => clearInterval(refreshInterval);
  }, [tsuki]);

  console.log({ supplyType: typeof totalSupply });
  console.log({ totalSupply });
  try {
    return `${bnToDec(new BigNumber(totalSupply))}`;
  } catch {
    return `0`;
  }

};

export default useTotalSupply;
