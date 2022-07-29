import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components';
import { MarketProvider } from '../context';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  container: `flex flex-col bg-gradient h-[100vh]`
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MarketProvider>
      <Layout>
        <main className={styles.container}>
          <Component {...pageProps} />
        </main>
      </Layout>
       <ToastContainer theme='dark'/>    
    </MarketProvider>
  )
}

export default MyApp
