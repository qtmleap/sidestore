import { createFileRoute, Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useIntlayer } from 'react-intlayer'
import { AppCard } from '@/components/ui/app-card'
import { InstallButton } from '@/components/ui/install-button'
import { mockApps } from '@/schemas/app.dto'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  const t = useIntlayer('app')

  return (
    <div className='min-h-screen bg-white dark:bg-black'>
      {/* Header - モバイル向け */}
      <header className='sticky top-0 z-10 bg-white/95 dark:bg-black/95 backdrop-blur-xl'>
        <div className='px-5 py-2'>
          <h1 className='text-[34px] font-bold tracking-tight text-zinc-900 dark:text-white'>{t.today}</h1>
        </div>
      </header>

      {/* Apps Section */}
      <main className='px-5 pb-20'>
        {/* 検索バー */}
        <div className='py-2 mb-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
            <input
              type='search'
              placeholder={t.searchPlaceholder.value}
              className='w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[17px] text-zinc-900 dark:text-white placeholder:text-zinc-500'
            />
          </div>
        </div>

        {/* アプリリスト */}
        <section>
          <h2 className='text-[22px] font-bold text-zinc-900 dark:text-white mb-2'>{t.testApps}</h2>
          <div className='divide-y divide-zinc-200 dark:divide-zinc-800'>
            {mockApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        {/* おすすめセクション - 横スクロール */}
        <section className='mt-6'>
          <h2 className='text-[22px] font-bold text-zinc-900 dark:text-white mb-3'>{t.recommended}</h2>
          <div className='flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide snap-x snap-mandatory'>
            {mockApps.map((app) => (
              <Link key={app.id} to='/app/$id' params={{ id: app.id }} className='shrink-0 w-[280px] snap-start'>
                <div className='rounded-2xl bg-zinc-50 dark:bg-zinc-900 overflow-hidden'>
                  <img src={app.screenshots[0]} alt={app.name} className='w-full aspect-[4/3] object-cover' />
                  <div className='p-3'>
                    <div className='flex gap-2.5 items-center'>
                      <img
                        src={app.icon}
                        alt={app.name}
                        className='w-10 h-10 rounded-[10px]'
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}
                      />
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-normal text-[15px] leading-tight text-zinc-900 dark:text-white truncate'>
                          {app.name}
                        </h3>
                        <p className='text-[13px] text-zinc-500 dark:text-zinc-400 truncate'>{app.category}</p>
                      </div>
                      <InstallButton appId={app.id} variant='gray' size='sm' />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
