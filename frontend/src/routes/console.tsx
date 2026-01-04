import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/console')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    
    console.log('Session no beforeLoad:', session) 

    if (!session) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,  
})