import { useEffect } from "react";

export function useBgShape(shape) {
  useEffect(() => {
    const bgShape = document.querySelector("#bg-shape");
    if (bgShape) {
      bgShape.style = `clip-path: ${shape}`;
    }
    //eslint-disable-next-line
  }, []);
}
