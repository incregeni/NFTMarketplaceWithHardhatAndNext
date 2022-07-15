import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components';
import { MarketProvider } from '../context';

const styles = {
  container: `flex flex-col bg-blue-900`
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MarketProvider>
      <Layout>
        <main className={styles.container}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </MarketProvider>
  )
}

export default MyApp
