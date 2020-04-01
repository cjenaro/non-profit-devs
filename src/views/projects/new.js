import React from "react";
import { useBgShape } from "../../hooks/use-bgshape";

export default function NewProject() {
  useBgShape("polygon(0 30%, 60% 30%, 100% 60%, 100% 100%, 0% 100%)");

  return <div>New Project</div>;
}
