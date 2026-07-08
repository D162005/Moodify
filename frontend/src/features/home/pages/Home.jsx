import React, { useEffect, useState } from 'react'
import FaceExpressionDetector from '../../expression/pages/FaceExpressionDetector'
import Player from '../components/Player'
import '../styles/home.scss'
import { useAuth } from '../../auth/hooks/useAuth'
import { Link, useNavigate } from 'react-router'

const Home = () => {
  const [mood, setMood] = useState('')

  const {user, loading, handleGetMe} = useAuth()

  const nevigate = useNavigate()

  useEffect(() => {
    handleGetMe()
    
  }, [])

  if(loading && !!user==true){
    return (<main><h1>Loading...</h1></main>)
  }

  console.log(!!user==true)
  

  return (
    <>
    {(!!user == false && loading) ? 
      <home-sec>
        <nav-bar>
          <h2 onClick={()=>{nevigate('/')}}>Moodify</h2>
        </nav-bar>
        <main>
          <label>WELCOME TO MOODIFY</label>
          <log-buttons>
            <button onClick={()=>{nevigate('/login')}}>Login</button>
            <button onClick={()=>{nevigate('/register')}}>Register</button>
          </log-buttons>
        </main>
      </home-sec> 
      :

      <main className="home">
        <header className="home__nav">
          <h1 className="home__brand">Moodify</h1>
          <button type="button" className="home__song-button">Song</button>
        </header>

        <section className="home__section home__section--detector">
          <FaceExpressionDetector onMoodDetected={setMood} compact />
        </section>

        <section className="home__section home__section--player">
          <Player mood={mood} compact />
        </section>
      </main>
    }
  </>
  )
}

export default Home
