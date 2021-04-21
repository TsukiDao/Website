import { useEffect, useState } from "react";
import { getInRebaseWindow } from "../tsuki-sdk/utils/index";
import useTsuki from "./useTsuki";

const useInRebaseWindow = () => {
  const [inRebaseWindow, setInRebaseWindow] = useState(false);
  const tsuki = useTsuki();

  useEffect(() => {

  const fetchInRebaseWindow = async () => {
    if (!tsuki) {
      return false;
    }

    try {
      setInRebaseWindow(await getInRebaseWindow(tsuki));
    } catch (error) {
      console.error(error);
    }
  };

    fetchInRebaseWindow();
  }, [tsuki]);

  return inRebaseWindow;
};

export default useInRebaseWindow;
