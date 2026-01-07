import { createFileRoute } from '@tanstack/react-router'
import {authClient} from '../../lib/auth-client'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [session, setSession] = useState<any>(null);

  async function fetchSession(){
    const {data} = await authClient.getSession();
    setSession(data);
  }

  useEffect (() => {
    fetchSession();
  })

  return(
    <>
      <div className='bg-zinc-800 h-full w-full flex justify-center'>
        <section className='fixed h-[5%] w-[20%] bg-red-800 mt-4 flex justify-center items-center rounded-md text-white'>
          <span>{session?.user?.name}</span>
        </section>
      </div>
    </>
  )
}
