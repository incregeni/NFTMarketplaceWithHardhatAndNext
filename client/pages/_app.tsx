import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components/Layout';

const styles = {
  container: `flex flex-col bg-blue-900`
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
          <main className={styles.container}>
           <Component {...pageProps} />
          </main>
         </Layout>
}

export default MyApp
