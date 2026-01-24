import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import { UpdateProvider } from '@/components/update-provider'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

import { routeTree } from './routeTree.gen'

import '../index.css'
import { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'

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

// Render the app
// biome-ignore lint/style/noNonNullAssertion: reason
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
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
    </StrictMode>
  )
}
