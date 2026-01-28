import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { InstallButton } from '@/components/ui/install-button'
import type { App } from '@/schemas/app.dto'

interface AppCardProps {
  app: App
}

export const AppCard = ({ app }: AppCardProps) => {
  return (
    <Link
      to='/app/$id'
      params={{ id: app.id }}
      className='group block py-3 active:bg-zinc-50 dark:active:bg-zinc-900 transition-colors'
    >
      <div className='flex items-center gap-3'>
        {/* App Icon */}
        <div className='shrink-0'>
          <img
            src={app.icon}
            alt={app.name}
            className='w-[64px] h-[64px] rounded-[14px]'
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.08)' }}
          />
        </div>

        {/* App Info */}
        <div className='flex-1 min-w-0'>
          <h3 className='font-normal text-[17px] leading-[22px] text-zinc-900 dark:text-white truncate'>{app.name}</h3>
          <p className='text-[15px] leading-[20px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5'>{app.developer}</p>
          <div className='flex items-center gap-1 mt-1 text-[13px] text-zinc-400 dark:text-zinc-500'>
            <span>{app.rating.toFixed(1)}</span>
            <Star className='w-3 h-3 fill-zinc-400 text-zinc-400' />
          </div>
        </div>

        {/* Get Button */}
        <div className='shrink-0'>
          <InstallButton appId={app.id} variant='gray' className='min-w-[70px]' />
        </div>
      </div>
    </Link>
  )
}
