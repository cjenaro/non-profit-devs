import React from "react";
import Link from "../components/link";
import { logout, getProfile } from "../utils/auth";

export default function Callback() {
  const user = getProfile();

  return (
    <div>
      You are now logged in!
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link onClick={logout}>Logout</Link>
    </div>
  );
}
