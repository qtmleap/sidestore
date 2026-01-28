import { useIntlayer } from 'react-intlayer'
import { cn } from '@/lib/utils'
import { installOTA } from '@/utils/ota'

interface InstallButtonProps {
  appId: string | number
  variant?: 'blue' | 'gray'
  size?: 'sm' | 'md'
  className?: string
  children?: React.ReactNode
}

export const InstallButton = ({ appId, variant = 'blue', size = 'md', className, children }: InstallButtonProps) => {
  const t = useIntlayer('app')
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    installOTA(appId)
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'get-button',
        variant === 'blue' ? 'get-button-blue' : 'get-button-gray',
        size === 'sm' ? 'text-[15px]' : 'min-w-[72px]',
        className
      )}
    >
      {children ?? t.get}
    </button>
  )
}
