import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, Loader2, Newspaper, Star, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useIntlayer, useLocale } from 'react-intlayer'
import { InstallButton } from '@/components/ui/install-button'
import { fetchApp, formatAppForDisplay, formatCount } from '@/utils/app'

export const Route = createFileRoute('/app/$id')({
  component: RouteComponent
})

function RouteComponent() {
  const { id } = Route.useParams()
  const t = useIntlayer('app')
  const { locale } = useLocale()
  const [app, setApp] = useState<ReturnType<typeof formatAppForDisplay> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      setLoading(true)
      setError(false)
      const appData = await fetchApp(id)
      if (appData) {
        setApp(formatAppForDisplay(appData))
      } else {
        setError(true)
      }
      setLoading(false)
    }
    loadApp()
  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center'>
        <Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
      </div>
    )
  }

  if (error || !app) {
    return (
      <div className='min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-zinc-900 dark:text-white mb-2'>{t.appNotFound}</h1>
          <Link to='/' className='text-blue-500 hover:text-blue-600'>
            {t.backToHome}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white dark:bg-black'>
      {/* Header - モバイル向け */}
      <header className='sticky top-0 z-10 bg-white/95 dark:bg-black/95 backdrop-blur-xl'>
        <div className='px-4 py-2 flex items-center gap-3'>
          <Link to='/' className='flex items-center text-[17px] text-blue-500 active:opacity-50'>
            <ChevronLeft className='w-5 h-5 -ml-1' />
            <span>{t.today}</span>
          </Link>
        </div>
      </header>

      <main className='px-5 pb-8'>
        {/* App Header */}
        <div className='py-4'>
          <div className='flex gap-4 items-start'>
            <img
              src={app.icon}
              alt={app.name}
              className='w-[118px] h-[118px] rounded-[26px] shrink-0'
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.08)' }}
            />
            <div className='flex-1 min-w-0 pt-1'>
              <h2 className='text-[21px] font-semibold leading-tight text-zinc-900 dark:text-white'>{app.name}</h2>
              <p className='text-[15px] text-zinc-500 dark:text-zinc-400 mt-1'>{app.category}</p>
              <InstallButton appId={id} variant='blue' className='mt-4' />
            </div>
          </div>
        </div>

        {/* Stats - バッジスタイル（モバイル: 横スクロール / iPad: グリッド） */}
        <div className='py-3 border-y border-zinc-200 dark:border-zinc-800 -mx-5 px-4'>
          <div className='flex md:grid md:grid-cols-5 gap-0 overflow-x-auto md:overflow-visible scrollbar-hide'>
            {/* 評価 */}
            <div className='shrink-0 w-[100px] md:w-auto px-2 py-1 text-center flex flex-col h-[72px]'>
              <div className='text-[11px] uppercase text-zinc-500 dark:text-zinc-400 tracking-wide font-semibold truncate'>
                {formatCount(app.ratingCount)}
                {t.ratingsCount}
              </div>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='h-[28px] flex items-center justify-center'>
                  <span className='text-[20px] md:text-[22px] font-bold text-zinc-700 dark:text-zinc-300 leading-none'>
                    {app.rating.toFixed(1)}
                  </span>
                </div>
                <div className='h-[16px] flex items-center justify-center gap-0.5'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 md:w-4 md:h-4 ${
                        star <= Math.floor(app.rating)
                          ? 'fill-zinc-500 text-zinc-500 dark:fill-zinc-400 dark:text-zinc-400'
                          : star - 0.5 <= app.rating
                            ? 'fill-zinc-500/50 text-zinc-500 dark:fill-zinc-400/50 dark:text-zinc-400'
                            : 'fill-none text-zinc-300 dark:text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className='w-px bg-zinc-200 dark:bg-zinc-800 shrink-0 my-2 md:hidden' />

            {/* 年齢 */}
            <div className='shrink-0 w-[100px] md:w-auto px-2 py-1 text-center flex flex-col h-[72px]'>
              <div className='text-[11px] uppercase text-zinc-500 dark:text-zinc-400 tracking-wide font-semibold'>
                {t.age}
              </div>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='h-[28px] flex items-center justify-center'>
                  <span className='text-[20px] md:text-[22px] font-bold text-zinc-700 dark:text-zinc-300 leading-none'>
                    {app.ageRating}
                  </span>
                </div>
                <div className='h-[16px] flex items-center justify-center'>
                  <span className='text-[11px] text-zinc-500 dark:text-zinc-400'>{t.yearsOld}</span>
                </div>
              </div>
            </div>

            <div className='w-px bg-zinc-200 dark:bg-zinc-800 shrink-0 my-2 md:hidden' />

            {/* カテゴリ */}
            <div className='shrink-0 w-[100px] md:w-auto px-2 py-1 text-center flex flex-col h-[72px]'>
              <div className='text-[11px] uppercase text-zinc-500 dark:text-zinc-400 tracking-wide font-semibold'>
                {t.category}
              </div>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='h-[28px] flex items-center justify-center'>
                  <Newspaper className='w-[22px] h-[22px] text-zinc-500 dark:text-zinc-400' />
                </div>
                <div className='h-[16px] flex items-center justify-center'>
                  <span className='text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[80px]'>
                    {app.category}
                  </span>
                </div>
              </div>
            </div>

            <div className='w-px bg-zinc-200 dark:bg-zinc-800 shrink-0 my-2 md:hidden' />

            {/* デベロッパ */}
            <div className='shrink-0 w-[100px] md:w-auto px-2 py-1 text-center flex flex-col h-[72px]'>
              <div className='text-[11px] uppercase text-zinc-500 dark:text-zinc-400 tracking-wide font-semibold'>
                {t.developer}
              </div>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='h-[28px] flex items-center justify-center'>
                  <User className='w-[22px] h-[22px] text-zinc-500 dark:text-zinc-400' />
                </div>
                <div className='h-[16px] flex items-center justify-center'>
                  <span className='text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[80px]'>
                    {app.developer}
                  </span>
                </div>
              </div>
            </div>

            <div className='w-px bg-zinc-200 dark:bg-zinc-800 shrink-0 my-2 md:hidden' />

            {/* サイズ */}
            <div className='shrink-0 w-[100px] md:w-auto px-2 py-1 text-center flex flex-col h-[72px]'>
              <div className='text-[11px] uppercase text-zinc-500 dark:text-zinc-400 tracking-wide font-semibold'>
                {t.size}
              </div>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='h-[28px] flex items-center justify-center'>
                  <span className='text-[20px] md:text-[22px] font-bold text-zinc-700 dark:text-zinc-300 leading-none'>
                    {app.size.replace(' MB', '')}
                  </span>
                </div>
                <div className='h-[16px] flex items-center justify-center'>
                  <span className='text-[11px] text-zinc-500 dark:text-zinc-400'>MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's New */}

        {app.releaseNotes && (
          <section className='py-5'>
            <h3 className='text-[22px] font-bold text-zinc-900 dark:text-white mb-1'>{t.whatsNew}</h3>
            <p className='text-[15px] text-zinc-500 dark:text-zinc-400 mb-3'>
              {t.version} {app.version}
            </p>
            <p className='text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap'>
              {app.releaseNotes}
            </p>
          </section>
        )}

        {/* Screenshots - 横スクロール */}
        <section className='py-5 border-t border-zinc-200 dark:border-zinc-800'>
          <h3 className='text-[22px] font-bold text-zinc-900 dark:text-white mb-3'>{t.preview}</h3>
          <div className='flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide snap-x snap-mandatory'>
            {app.screenshots.map((screenshot, index) => (
              <img
                key={screenshot}
                src={screenshot}
                alt={`${app.name} ${t.screenshot} ${index + 1}`}
                className='h-[400px] rounded-2xl snap-start shrink-0'
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              />
            ))}
          </div>
        </section>

        {/* Description */}
        <section className='py-5 border-t border-zinc-200 dark:border-zinc-800'>
          <div className='relative'>
            <p
              className={`text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap ${
                !isDescriptionExpanded ? 'line-clamp-3' : ''
              }`}
            >
              {app.description}
            </p>
            {!isDescriptionExpanded && (
              <button
                type='button'
                onClick={() => setIsDescriptionExpanded(true)}
                className='text-[15px] text-blue-500 font-medium mt-1'
              >
                {t.more}
              </button>
            )}
          </div>
        </section>

        {/* Information */}
        <section className='py-5 border-t border-zinc-200 dark:border-zinc-800'>
          <h3 className='text-[22px] font-bold text-zinc-900 dark:text-white mb-4'>{t.information}</h3>
          <div className='space-y-0'>
            <div className='flex justify-between py-3 border-b border-zinc-200 dark:border-zinc-800'>
              <span className='text-[15px] text-zinc-500 dark:text-zinc-400'>{t.seller}</span>
              <span className='text-[15px] text-zinc-900 dark:text-white'>{app.developer}</span>
            </div>
            <div className='flex justify-between py-3 border-b border-zinc-200 dark:border-zinc-800'>
              <span className='text-[15px] text-zinc-500 dark:text-zinc-400'>{t.category}</span>
              <span className='text-[15px] text-blue-500'>{app.category}</span>
            </div>
            <div className='flex justify-between py-3 border-b border-zinc-200 dark:border-zinc-800'>
              <span className='text-[15px] text-zinc-500 dark:text-zinc-400'>{t.version}</span>
              <span className='text-[15px] text-zinc-900 dark:text-white'>{app.version}</span>
            </div>
            <div className='flex justify-between py-3'>
              <span className='text-[15px] text-zinc-500 dark:text-zinc-400'>{t.releaseDate}</span>
              <span className='text-[15px] text-zinc-900 dark:text-white'>
                {new Date(app.currentVersionReleaseDate).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US')}
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
