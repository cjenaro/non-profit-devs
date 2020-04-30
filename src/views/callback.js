import React from "react";

import { useAuth } from "react-use-auth";
import useMount from "../hooks/use-mount";

const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth();
  useMount(() => {
    handleAuthentication({ postLoginRoute: "/profile" });
  });

  return (
    <h1>
      This is the auth callback page, you should be redirected immediately.
    </h1>
  );
};

export default Auth0CallbackPage;
