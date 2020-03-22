import React from "react";
import Link from "../components/link";
import { login } from "../utils/auth";

export default function Home() {
  return (
    <div>
      <Link onClick={login}>Login</Link>
    </div>
  );
}
