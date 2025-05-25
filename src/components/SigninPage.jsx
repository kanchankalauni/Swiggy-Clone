import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utils/authSlice'
import { useNavigate } from 'react-router-dom'

function SigninPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.authSlice.userData)

    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
        const userData = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }
        dispatch(addUserData(userData))
        navigate("/")
    }

    async function handleLogout() {
        await signOut(auth)
        dispatch(removeUserData())
        navigate("/")
    }

    return (
        <div>
            Login
            <button onClick={handleAuth} className='bg-slate-300 p-5 mt-6'>
                Google login
            </button>
            {
                userData && <button onClick={handleLogout} className='bg-slate-300 p-5 mt-6'>
                    Logout
                </button>
            }
        </div>
    )
}

export default SigninPage