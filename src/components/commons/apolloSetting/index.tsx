import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface IApolloSettingProps {
  children: JSX.Element;
}

const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting({ children }: IApolloSettingProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
