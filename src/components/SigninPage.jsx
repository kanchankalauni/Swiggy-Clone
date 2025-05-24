import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'

function SigninPage() {

    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
    }

  return (
    <div>
        Login
        <button onClick={handleAuth} className='bg-slate-300 p-5 mt-6'>
            Google login
        </button>
    </div>
  )
}

export default SigninPage