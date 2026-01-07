import { authClient } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

  const [email, setEmail] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [name, setName] = useState<any>(null);

  const handleSignUp = async () => {
    const {data, error} = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: 'http://localhost:3000/console/dashboard',
    });

    if (error){
      window.alert('Error: ' + error.message);
    }else {
      window.alert('Success! Please check your email to confirm your account.');
    }
  }

  return (
    <div className='h-full w-full bg-zinc-800 flex justify-center items-center'>
        <section className="h-[85%] w-[35%] border-1 border-red-500 rounded-lg 
                            flex flex-col bg-zinc-900/50 
                            shadow-2xl shadow-red-500 items-center gap-6"
      >
        <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className='bg-red-900/50 h-[8%] w-[80%] rounded-md mb-2 text-white mt-15'
              placeholder='Username'    
        />
        <input type="email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)} 
              className='bg-red-900/50 h-[8%] w-[80%] rounded-md mb-2 text-white'
              placeholder='Example@gmail.com'    
        />
        <input type="password" 
               value={password} 
               onChange={(e) => setPassword(e.target.value)} 
              className='bg-red-900/50 h-[8%] w-[80%] rounded-md mb-2 text-white'
              placeholder='Create your password'    
        />

        <button onClick={handleSignUp} className='bg-red-800/50 h-[8%] w-[80%] rounded-md mt-40 text-white mt-15'>
          Sign Up
        </button>
      </section>
    </div>
  )
}


        