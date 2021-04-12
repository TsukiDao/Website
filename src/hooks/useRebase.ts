import { useCallback } from "react";
import { rebase } from "../tsuki-sdk/utils/index";
import useTsuki from "./useTsuki";
import { useWallet } from "use-wallet";

const useRebase = () => {

  const tsuki = useTsuki();
  const { account } = useWallet()

  const handleRebase = useCallback(async() => {
    if(!account || !tsuki) {
      return
    }

    try{
      return await rebase(account, tsuki)
    } catch (error) {
      console.error(error)
    }
  }, [account, tsuki])

  return { onRebase: handleRebase }
};

export default useRebase;
