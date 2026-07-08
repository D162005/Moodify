import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getSongsByMood } from '../services/song.api'
import '../styles/player.scss'

const Player = ({ mood, compact = false }) => {
  const audioRef = useRef(null)
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadSongs() {
      if (!mood) {
        setSongs([])
        setCurrentIndex(0)
        setError('')
        return
      }

      try {
        setLoading(true)
        setError('')
        const data = await getSongsByMood(mood)
        if (!isActive) return

        setSongs(data.songs || [])
        setCurrentIndex(0)
      } catch (err) {
        if (!isActive) return
        setError(err?.response?.data?.message || err.message || 'Failed to load songs')
        setSongs([])
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadSongs()

    return () => {
      isActive = false
    }
  }, [mood])

  const currentSong = useMemo(() => songs[currentIndex] || null, [songs, currentIndex])

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load()
      audioRef.current.play().catch(() => {})
    }
  }, [currentSong])

  function handlePrevious() {
    setCurrentIndex((index) => (songs.length ? (index - 1 + songs.length) % songs.length : 0))
  }

  function handleNext() {
    setCurrentIndex((index) => (songs.length ? (index + 1) % songs.length : 0))
  }

  if (!mood) {
    return (
      <section className={compact ? 'player player--compact' : 'player'}>
        <div className="player__card player__card--empty">
          <h3 style={{ margin: 0 }}>Player</h3>
          <p style={{ marginBottom: 0 }}>Detect an expression to load a matching song.</p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className={compact ? 'player player--compact' : 'player'}>
        <div className="player__card player__card--empty">
          <h3 style={{ margin: 0 }}>Player</h3>
          <p style={{ marginBottom: 0 }}>Loading songs for {mood}...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={compact ? 'player player--compact' : 'player'}>
        <div className="player__card player__card--empty">
          <h3 style={{ margin: 0 }}>Player</h3>
          <p style={{ marginBottom: 0, color: 'crimson' }}>{error}</p>
        </div>
      </section>
    )
  }

  if (!currentSong) {
    return (
      <section className={compact ? 'player player--compact' : 'player'}>
        <div className="player__card player__card--empty">
          <h3 style={{ margin: 0 }}>Player</h3>
          <p style={{ marginBottom: 0 }}>No songs found for {mood}.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={compact ? 'player player--compact' : 'player'}>
      <div className="player__card">
        <div className="player__song">
          <img
            src={currentSong.posterUrl}
            alt={currentSong.title}
            className="player__poster"
          />
          <div className="player__details">
            <h3 className="player__title">{currentSong.title}</h3>
            <p className="player__mood">Mood: {mood}</p>
            <p className="player__track">
              Track {currentIndex + 1} of {songs.length}
            </p>
          </div>
        </div>

        <audio ref={audioRef} controls autoPlay className="player__audio">
          <source src={currentSong.url} />
        </audio>

        <div className="player__actions">
          <button type="button" onClick={handlePrevious} disabled={songs.length < 2} className="butt">
            Previous
          </button>
          <button type="button" onClick={handleNext} disabled={songs.length < 2} className="butt">
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Player
