/// <reference types="vite/client" />

declare const localStorage: any
declare const window: any

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const httpLink = new HttpLink({
  uri: import.meta.env.DEV ? 'http://localhost:3000/graphql' : '/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
