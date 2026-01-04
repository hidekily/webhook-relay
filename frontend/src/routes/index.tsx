import { createFileRoute, Link } from '@tanstack/react-router'
import {authClient} from '../lib/auth-client'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const callRedirectURL = window.location.origin + "/console/dashboard";

  const handleLoginGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: callRedirectURL,
    });

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  const handleLoginDiscord = async () => {
    const data = await authClient.signIn.social({
      provider: "discord",
      callbackURL: callRedirectURL,
    });

    console.log("teste")

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  const handleLoginGithub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: callRedirectURL,
    });

    console.log("hi")

    if(data.error){
      alert(data.error.message)
      return
    }
  };


  return (
    <div className='bg-zinc-800 h-full w-full flex justify-center items-center'>
      <section className="h-[80%] w-[35%] border-1 border-red-500 rounded-lg 
                          flex flex-col bg-zinc-900/50 shadow-2xl shadow-red-500 items-center gap-6"
      >
        {/* section for email login */}
        <section className="flex flex-col gap-5 mt-10 h-[70%] w-[80%] justify-center items-center">
          <input
            type="email"
            placeholder="Email"
            className='input-login w-full bg-red-900 rounded-md h-14 text-center text-white'
          />
          <input
            type="password"
            placeholder="Password"
            className='input-login w-full bg-red-900 rounded-md h-14 text-center text-white'
          />

          <div className="flex flex-row justify-center items-center gap-4 mt-4">
            <button className='text-white rounded-md h-20 w-20 bg-red-900'>Login</button>
            <span className='text-red-800 text-3xl'>|</span>
            <Link to="/register" className="flex justify-center items-center text-white rounded-md h-20 w-20 bg-red-900">Register</Link>
          </div>
        </section>

        <hr className="w-full border-red-700"/>

        {/* section for login buttons */}
        <section className="flex flex-row justify-center items-center gap-15 h-[30%]">
          <button onClick={handleLoginGoogle} className='button-login google'></button>
          <button onClick={handleLoginDiscord} className='button-login discord'></button>
          <button onClick={handleLoginGithub} className='button-login github'></button>
        </section>
      </section>
    </div>
  )
}
