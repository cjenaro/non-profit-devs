import React from "react";
import Link from "../components/link";
import { useAuth } from "react-use-auth";

export default function Home() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {!isAuthenticated() ? (
        <Link onClick={login}>Login</Link>
      ) : (
        <Link onClick={logout}>Logout</Link>
      )}
    </div>
  );
}
