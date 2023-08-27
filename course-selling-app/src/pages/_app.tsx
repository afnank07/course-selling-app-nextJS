import AppBar from '@/components/AppBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {

  return <RecoilRoot>
  <SessionProvider session={pageProps.session}>
  <AppBar/>
  <Component {...pageProps} />
  </SessionProvider>
  </RecoilRoot>
}
