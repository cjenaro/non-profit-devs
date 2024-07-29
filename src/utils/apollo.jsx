import React, { useContext } from 'react';
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { ApolloProvider } from 'react-apollo';
import { UserContext } from '../context/UserContext.jsx';

export const ApolloWrapper = ({ children }) => {
  const [user] = useContext(UserContext);
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_BACKEND_URL,
  });

  const authLink = new ApolloLink((operation, forward) => {
    if (user && user.token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${user.token}`,
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
