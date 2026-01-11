import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='bg-neutral-200 h-full w-full overflow-auto'>
      <nav className='h-[10%] w-full fixed bg-zinc-800 overflow-auto'>
        <div className="bg-emerald-900 w-[9000px] h-full">

        </div>
      </nav>
    </div>  
  )
}
