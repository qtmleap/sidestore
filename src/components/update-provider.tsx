import { useAtom } from 'jotai'
import { type ReactNode, useEffect, useRef } from 'react'
import { appVersionAtom, queryCacheAtom, RESET } from '@/stores/version'

interface UpdateProviderProps {
  children: ReactNode
  queryClient: {
    clear: () => void
  }
}

/**
 * アプリバージョンをチェックし、新バージョンの場合はキャッシュをクリアするプロバイダー
 */
export const UpdateProvider = ({ children, queryClient }: UpdateProviderProps) => {
  const [storedVersion, setStoredVersion] = useAtom(appVersionAtom)
  const [queryCache, setQueryCache] = useAtom(queryCacheAtom)
  const hasChecked = useRef(false)

  useEffect(() => {
    if (hasChecked.current) return
    hasChecked.current = true

    const currentVersion = `${__APP_VERSION__}-${__GIT_HASH__}`
    const hasOldCache = queryCache !== null

    if (!storedVersion) {
      // 初回アクセス（古いバージョンからの更新を含む）
      if (hasOldCache) {
        console.log('Old cache detected on first access. Clearing cache...')
        setQueryCache(RESET)
        queryClient.clear()
        console.log('Cache cleared successfully')
      }
      setStoredVersion(currentVersion)
      console.log(`Initial version set: ${currentVersion}`)
    } else if (storedVersion !== currentVersion) {
      // バージョンが変更された
      console.log(`Version changed from ${storedVersion} to ${currentVersion}. Clearing cache...`)
      setQueryCache(RESET)
      queryClient.clear()
      setStoredVersion(currentVersion)
      console.log('Cache cleared successfully')
    } else {
      console.log(`Version unchanged: ${currentVersion}`)
    }
  }, [storedVersion, setStoredVersion, queryClient, queryCache, setQueryCache])

  return <>{children}</>
}
