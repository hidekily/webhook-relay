import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <>
      <div className='bg-zinc-800 h-full w-full flex justify-center items-center'>

      </div>
    </>
  )
}
