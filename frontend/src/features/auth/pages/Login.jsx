import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

    const [userName, setUserName] = useState("")
    // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const nevigator = useNavigate()

    const {loading, handleLoginUser} = useAuth()

    function handleFormSubmit(e){
        e.preventDefault()

        handleLoginUser({ userName, password })

        nevigator('/')
    }

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

  return (
    <>
      <nav-bar>
        <h2 onClick={()=>{nevigator('/')}}>Moodify</h2>
      </nav-bar>
      <main>
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="userName"  placeholder='User Name' onInput={(e)=>{setUserName(e.target.value)}}/>
            <input type="password" name='password'  placeholder='Password' onInput={(e)=>{setPassword(e.target.value)}}/>
            <button>Login</button>

        </form>
        <p>Don't have Account <Link className='authTogel' to='/register'>Register</Link></p>
    </main>
    </>
  )
}

export default Login