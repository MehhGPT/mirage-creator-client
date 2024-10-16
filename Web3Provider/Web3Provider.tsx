import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider } from 'wagmi';
import {
  polygonAmoy
} from 'wagmi/chains';
import { darkTheme, getDefaultConfig, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import { Props } from 'next/script';
import merge from 'lodash.merge';

const config = getDefaultConfig({
  appName: 'Mirage Creators',
  projectId: process.env.NEXT_PUBLIC_WEB3_KEY as string,
  chains: [
    polygonAmoy,
  ],
  ssr: true,
  transports: {
    [polygonAmoy.id]: http("https://polygon-amoy.infura.io/v3/549e942a01c140bd96ec9f0f97198d21"),
  }
});

const client = new QueryClient();

const myTheme = merge(
  darkTheme({overlayBlur: "large"}), {
      colors: {
          accentColor: '#1c1c1c',
      },
  } as Theme
);

function Web3Provider(props: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={myTheme}>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3Provider;
