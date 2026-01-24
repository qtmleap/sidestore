import { atomWithStorage, RESET } from 'jotai/utils'

export const STORAGE_KEY = 'APP_VERSION'
export const CACHE_KEY = 'REACT_QUERY_OFFLINE_CACHE'

export const appVersionAtom = atomWithStorage<string | null>(STORAGE_KEY, null)
export const queryCacheAtom = atomWithStorage<string | null>(CACHE_KEY, null)

export { RESET }
