import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import {authClient} from '../lib/auth-client'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})


function RouteComponent() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: 'http://localhost:3000/console/dashboard',
    })

    if (error) {
      alert('Erro: ' + error.message)
    } else {
      alert('Login realizado!')
      Navigate({ to: '/console/dashboard' })
    }
  }

  const getRedirectURL = () => window.location.origin + "/console/dashboard";

  const handleLoginGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: getRedirectURL(),
    });

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  const handleLoginDiscord = async () => {
    const data = await authClient.signIn.social({

      provider: "discord",
      callbackURL: getRedirectURL(),
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
      callbackURL: getRedirectURL(),
    });

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  


  return (
    <div className='bg-zinc-800 h-full w-full flex justify-center items-center'>
      <section className="h-[85%] w-[35%] border-1 border-red-500 rounded-lg 
                          flex flex-col bg-zinc-900/50 shadow-2xl shadow-red-500 items-center gap-6"
      >
        {/* section for email login */}
        <section className="flex flex-col gap-5 mt-10 h-[85%] w-[80%] justify-center">
          <span className='flex justify-self-start text-red-700'>
            Email
          </span>

          <input 
            type="email"
            placeholder='example@gmail.com' 
            className='bg-red-900/50 h-[12%] w-full rounded-md mb-2 text-white' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className='flex justify-self-start text-red-700'>
            Password
          </span>

          <input 
            type="password"
            placeholder='Insert your password' 
            className='bg-red-900/50 h-[12%] w-full rounded-md text-white'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Login" 
                 className='bg-red-800/70 h-[12%] w-full rounded-md text-white' 
                  onClick={handleSignIn}
          />
          <Link to="/register" className='text-white underline flex justify-center mt-2'>
            Don't have an account? Register here!
          </Link>
        </section>

        <hr className="w-full border-red-700"/>

        {/* section for login buttons */}
        <section className="flex flex-row justify-center items-center gap-15 h-[15%]">
          <button onClick={handleLoginGoogle} className='button-login google'></button>
          <button onClick={handleLoginDiscord} className='button-login discord'></button>
          <button onClick={handleLoginGithub} className='button-login github'></button>
        </section>
      </section>
    </div>
  )
}
