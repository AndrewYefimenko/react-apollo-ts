import { ApolloClient } from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Auth from '../services/Auth';

const httpLink = new HttpLink({ uri:'https://api.github.com/graphql'});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token: string | null = Auth.getToken();
  operation.setContext({
    headers: {
      Authorization: token ? `bearer ${token}` : null,
    }
  });
  
  return forward && forward(operation) || null;
});

const authError = onError(({graphQLErrors, networkError}: any) => {
  if (networkError && networkError.statusCode === 401) {
    Auth.logout();
  }
});

export const client = new ApolloClient({
  link: from([authMiddleware, authError, httpLink]),
  cache: new InMemoryCache()
});
