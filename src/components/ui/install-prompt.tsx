import { Download, Plus, Share, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export const InstallPrompt = () => {
  const [showIosInstall, setShowIosInstall] = useState(false)
  const [showAndroidInstall, setShowAndroidInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // iOS Safari check
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isInStandaloneMode =
      'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone

    if (isIos && !isInStandaloneMode) {
      const hasSeenPrompt = localStorage.getItem('ios-install-prompt-seen')
      if (!hasSeenPrompt) {
        setTimeout(() => setShowIosInstall(true), 3000)
      }
    }

    // Android/Desktop PWA install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-seen')
      if (!hasSeenPrompt) {
        setTimeout(() => setShowAndroidInstall(true), 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleIosClose = () => {
    setShowIosInstall(false)
    localStorage.setItem('ios-install-prompt-seen', 'true')
  }

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }

    setDeferredPrompt(null)
    setShowAndroidInstall(false)
    localStorage.setItem('pwa-install-prompt-seen', 'true')
  }

  const handleAndroidClose = () => {
    setShowAndroidInstall(false)
    localStorage.setItem('pwa-install-prompt-seen', 'true')
  }

  if (showIosInstall) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t-2 border-blue-500 shadow-2xl animate-slide-up'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <div className='flex items-start gap-4'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-zinc-900 dark:text-white mb-2'>ホーム画面に追加</h3>
              <div className='space-y-3 text-sm text-zinc-600 dark:text-zinc-300'>
                <p>このアプリをホーム画面に追加して、アプリのように使用できます:</p>
                <ol className='list-decimal list-inside space-y-2 pl-2'>
                  <li className='flex items-start gap-2'>
                    <Share className='w-5 h-5 mt-0.5 text-blue-500' />
                    <span>Safariのシェアボタンをタップ</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <Plus className='w-5 h-5 mt-0.5 text-blue-500' />
                    <span>「ホーム画面に追加」を選択</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <Download className='w-5 h-5 mt-0.5 text-blue-500' />
                    <span>「追加」をタップして完了</span>
                  </li>
                </ol>
              </div>
            </div>
            <button
              type='button'
              onClick={handleIosClose}
              className='p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'
            >
              <X className='w-5 h-5 text-zinc-500' />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showAndroidInstall && deferredPrompt) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t-2 border-blue-500 shadow-2xl animate-slide-up'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <div className='flex items-start gap-4'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-zinc-900 dark:text-white mb-2'>アプリをインストール</h3>
              <p className='text-sm text-zinc-600 dark:text-zinc-300 mb-4'>
                このアプリをデバイスにインストールして、より快適に使用できます。
              </p>
              <button
                type='button'
                onClick={handleAndroidInstall}
                className='px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors'
              >
                インストール
              </button>
            </div>
            <button
              type='button'
              onClick={handleAndroidClose}
              className='p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'
            >
              <X className='w-5 h-5 text-zinc-500' />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
