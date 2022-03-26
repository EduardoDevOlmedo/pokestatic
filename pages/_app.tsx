import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme, lightTheme } from '../themes';
import useDarkMode from 'use-dark-mode';


function MyApp({ Component, pageProps }: AppProps) {
 
  const darkMode = useDarkMode(false)

  return  (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
