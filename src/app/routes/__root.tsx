import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootComponent = () => {
  return (
    <div className='min-h-screen flex flex-col select-none'>
      <main className='flex-1'>
        <Outlet />
      </main>
      <TanStackRouterDevtools position='bottom-right' />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
