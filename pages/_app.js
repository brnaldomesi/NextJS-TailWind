import React from 'react'

import '../styles/index.css'
import { MyProvider } from 'components/jobs/ProviderWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
  )
}

export default MyApp
