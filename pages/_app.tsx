import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Compose from '../helpers/CombineProviders'
import { AuthProvider } from '../hooks/useAuth'
import { ModalProvider } from '../hooks/useModal'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Compose components={[AuthProvider, ModalProvider]}>
      <Component {...pageProps} />
    </Compose>
  )
}

export default MyApp
