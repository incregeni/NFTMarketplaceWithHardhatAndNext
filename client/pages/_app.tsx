import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
          <main className='bg-blue-900'>
           <Component {...pageProps} />

          </main>
         </Layout>
}

export default MyApp
