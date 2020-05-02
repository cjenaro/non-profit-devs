import React from "react";
import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";
import { ApolloProvider } from "react-apollo";
import { useAuth } from "react-use-auth";

export const ApolloWrapper = ({ children }) => {
  const { authResult } = useAuth();
  console.log(authResult);
  const client = new ApolloClient({
    uri: "https://non-profit-devs.herokuapp.com/v1/graphql",
    headers: {
      Authorization: `Bearer ${authResult && authResult.idToken}`,
    },
    fetch,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
