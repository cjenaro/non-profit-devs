import { useEffect } from "react";

export default function useMount(effect) {
  useEffect(() => {
    effect();
    //eslint-disable-next-line
  }, []);
}
