import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Locales } from 'intlayer'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { IntlayerProvider } from 'react-intlayer'
import { Toaster } from '@/components/ui/sonner'
import { UpdateProvider } from '@/components/update-provider'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

import '../index.css'
import { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'

// Detect browser language and map to supported locales
const getBrowserLocale = (): Locales => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en'
  // Check if Japanese
  if (browserLang.startsWith('ja')) {
    return Locales.JAPANESE
  }
  // Default to English for all other languages
  return Locales.ENGLISH
}

const detectedLocale = getBrowserLocale()

import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreloadStaleTime: 0,
  scrollRestoration: true
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 0,
      networkMode: 'offlineFirst'
    }
  }
})

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  throttleTime: 3000,
  key: 'REACT_QUERY_OFFLINE_CACHE',
  serialize: JSON.stringify,
  deserialize: JSON.parse
})

// PWA Install prompt handler
let deferredPrompt: BeforeInstallPromptEvent | null = null

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e as BeforeInstallPromptEvent
  window.deferredPrompt = deferredPrompt
  console.log('PWA install prompt captured')
})

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed')
  deferredPrompt = null
  window.deferredPrompt = null
})

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('SW registered: ', registration)
      },
      (err) => {
        console.log('SW registration failed: ', err)
      }
    )
  })
}

// Render the app
// biome-ignore lint/style/noNonNullAssertion: reason
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <IntlayerProvider locale={detectedLocale}>
        <PersistQueryClientProvider
          client={client}
          persistOptions={{
            persister: persister,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            dehydrateOptions: {
              shouldDehydrateQuery: (query) => {
                return query.state.status === 'success'
              }
            }
          }}
        >
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <UpdateProvider queryClient={client}>
              <RouterProvider router={router} />
              <Toaster />
            </UpdateProvider>
          </ThemeProvider>
        </PersistQueryClientProvider>
      </IntlayerProvider>
    </StrictMode>
  )
}
