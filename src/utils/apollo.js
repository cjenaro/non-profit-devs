import React from "react"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import { ApolloProvider } from "react-apollo"

export const ApolloWrapper = ({ bearer, children }) => {
  const client = new ApolloClient({
    uri: "https://non-profit-devs.herokuapp.com/v1/graphql",
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
    fetch,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
