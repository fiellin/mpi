"use client"

import { createContext, useContext, useRef, useEffect, type ReactNode, useState } from "react"

interface AudioContextType {
  playAudio: () => void
  stopAudio: () => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Initialize audio element with new music
    audioRef.current = new Audio("/image/brunomajor.ogg")
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Update playing state when audio starts/stops
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audioRef.current.addEventListener("play", handlePlay)
    audioRef.current.addEventListener("pause", handlePause)
    audioRef.current.addEventListener("ended", handleEnded)

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlay)
        audioRef.current.removeEventListener("pause", handlePause)
        audioRef.current.removeEventListener("ended", handleEnded)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
  }

  const stopAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
    }
  }

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, isPlaying, setIsPlaying }}>{children}</AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
