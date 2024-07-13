import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import ApolloSetting from '../src/components/commons/apolloSetting';
import '../styles/globals.css';
import { globalStyles } from '../src/commons/styles/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}
