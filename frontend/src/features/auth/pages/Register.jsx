import React from 'react'
import '../../common/styles/form.scss'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const nevigator = useNavigate()

    const {loading, handleRegister} = useAuth()

    function handleFormSubmit(e){
        
        e.preventDefault()

        handleRegister({userName,email,password})

        nevigator('/')

    }

  return (
    <>
    <nav-bar>
        <h2 onClick={()=>{nevigator('/')}}>Moodify</h2>
    </nav-bar>
      <main>
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
            <input type="text" name='userName'  placeholder='User Name' onInput={(e)=>{setUserName(e.target.value)}}/>
            <input type="text" name='email'  placeholder='Email' onInput={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" name='password' placeholder='Password' onInput={(e)=>{setPassword(e.target.value)}}/>
            <button>Register</button>
        </form>
        <p>Already have a Account <Link className='authTogel' to='/login'>Login</Link></p>
    </main>
    </>
  )
}

export default Register
