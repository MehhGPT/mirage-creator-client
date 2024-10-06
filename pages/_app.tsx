import Web3Provider from '../Web3Provider/Web3Provider';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Dashboard } from './dashboard';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3Provider>
        <Dashboard />
      </Web3Provider>
    </>
  );
}

export default App;
