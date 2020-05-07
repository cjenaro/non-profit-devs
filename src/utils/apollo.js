import React from "react";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "apollo-boost";
import fetch from "isomorphic-fetch";
import { ApolloProvider } from "react-apollo";
import { useAuth } from "react-use-auth";

export const ApolloWrapper = ({ children }) => {
  const { authResult } = useAuth();

  const httpLink = new HttpLink({
    uri: "https://non-profit-devs.herokuapp.com/v1/graphql",
  });

  const authLink = new ApolloLink((operation, forward) => {
    if (authResult && authResult.idToken) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${authResult.idToken}`,
        },
      });
    }

    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    fetch,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
