import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  polygonAmoy
} from 'wagmi/chains';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Props } from 'next/script';

const config = getDefaultConfig({
  appName: 'Mirage Creators',
  projectId: 'ClientId For DAPP',
  chains: [
    mainnet,
    polygon,
    polygonAmoy,
    optimism,
    arbitrum,
    base,
    sepolia
  ],
  ssr: true,
});

const client = new QueryClient();

function Web3Provider(props: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={darkTheme()}>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3Provider;
