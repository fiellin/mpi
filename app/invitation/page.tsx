"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Heart, Play, Pause, Volume2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { areAllPagesConfirmed, isPageConfirmed } from "@/lib/confirmation"
import { useAudio } from "@/lib/audio-context"
import { Button } from "@/components/ui/button"

export default function InvitationPage() {
  const router = useRouter()
  const { playAudio, stopAudio, isPlaying } = useAudio()
  const [showMusicPrompt, setShowMusicPrompt] = useState(false)
  const [allConfirmed, setAllConfirmed] = useState(false)
  const [confirmedPages, setConfirmedPages] = useState({
    "our-story": false,
    wish: false,
    "my-wish": false,
    "special-invitation": false,
  })

  // Add a new state to track if music prompt has been shown
  const [musicPromptShown, setMusicPromptShown] = useState(false)

  // Check if music should be prompted
  useEffect(() => {
    // Check if music prompt has been shown before
    const hasShownMusicPrompt = localStorage.getItem("musicPromptShown") === "true"

    // Only show music prompt if music is not already playing and hasn't been shown before
    if (!hasShownMusicPrompt && !isPlaying) {
      setShowMusicPrompt(true)
    } else {
      setShowMusicPrompt(false)
    }

    setMusicPromptShown(hasShownMusicPrompt)
  }, [isPlaying])

  // Check if all pages are confirmed
  useEffect(() => {
    const checkConfirmations = () => {
      const ourStoryConfirmed = isPageConfirmed("our-story")
      const wishConfirmed = isPageConfirmed("wish")
      const myWishConfirmed = isPageConfirmed("my-wish")
      const specialInvitationConfirmed = isPageConfirmed("special-invitation")

      setAllConfirmed(areAllPagesConfirmed())
      setConfirmedPages({
        "our-story": ourStoryConfirmed,
        wish: wishConfirmed,
        "my-wish": myWishConfirmed,
        "special-invitation": specialInvitationConfirmed,
      })

      // Debug logging (remove in production)
      console.log("Confirmation status:", {
        "our-story": ourStoryConfirmed,
        wish: wishConfirmed,
        "my-wish": myWishConfirmed,
        "special-invitation": specialInvitationConfirmed,
      })
    }

    checkConfirmations()

    // Listen for storage changes
    const handleStorageChange = () => {
      checkConfirmations()
    }

    window.addEventListener("storage", handleStorageChange)

    // Also listen for custom events
    window.addEventListener("confirmationUpdate", handleStorageChange)

    const interval = setInterval(checkConfirmations, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("confirmationUpdate", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const handlePlayMusic = () => {
    playAudio()
    // Mark that music prompt has been shown
    localStorage.setItem("musicPromptShown", "true")
    setMusicPromptShown(true)
    setTimeout(() => {
      setShowMusicPrompt(false)
    }, 1000)
  }

  const canAccessWish = confirmedPages["our-story"]
  const canAccessMyWish = confirmedPages["wish"]
  const canAccessSpecialInvitation = confirmedPages["my-wish"]

  const invitationCards = [
    {
      id: "our-story",
      title: "Our Story",
      description: "How we met and our journey together",
      icon: Heart,
      route: "/our-story",
      gradient: "from-[#E91E63] to-[#F48FB1]",
      isConfirmed: confirmedPages["our-story"],
      isAccessible: true,
    },
    {
      id: "wish",
      title: "apa ini hayo :p",
      description: "Something special is waiting for you",
      icon: Star,
      route: "/wish",
      gradient: "from-[#F48FB1] to-[#E91E63]",
      isConfirmed: confirmedPages.wish,
      isAccessible: canAccessWish,
    },
    {
      id: "my-wish",
      title: "my wish for us",
      description: "A heartfelt message for our future",
      icon: Heart,
      route: "/my-wish",
      gradient: "from-[#E91E63] to-[#F48FB1]",
      isConfirmed: confirmedPages["my-wish"],
      isAccessible: canAccessMyWish,
    },
    {
      id: "special-invitation",
      title: "special invitation",
      description: "The final surprise awaits",
      icon: Star,
      route: "/special-invitation",
      gradient: "from-[#F48FB1] to-[#E91E63]",
      isConfirmed: confirmedPages["special-invitation"],
      isAccessible: canAccessSpecialInvitation,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] via-[#1A1A3A] to-[#2D1B69] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#F48FB1]/10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#E91E63]/10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Music Prompt Overlay */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 max-w-md w-full relative border border-[#F48FB1]/20 text-center"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-[#F48FB1]/20 rounded-full mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Volume2 className="w-8 h-8 text-[#F48FB1]" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-4">Biar romantis, nyalain musik dulu ga sih</h2>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handlePlayMusic}
                  className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(244,143,177,0.3)]"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Play Music
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 max-w-5xl w-full relative border border-[#F48FB1]/20 transition-all duration-500 ${
          showMusicPrompt ? "opacity-30 pointer-events-none" : "opacity-100"
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showMusicPrompt ? 0.3 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dear Sofia Putri Nabila,</h1>
          <p className="text-[#F48FB1] text-xl md:text-2xl mb-2">You're invited to explore our story... ✨</p>
          <p className="text-white/70 text-lg">
            I've prepared something special for you. Click on each card to explore your surprise
          </p>
        </motion.div>

        {/* Music Control */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: showMusicPrompt ? 0 : 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={isPlaying ? stopAudio : playAudio}
            variant="ghost"
            className="text-[#F48FB1] hover:text-white hover:bg-[#F48FB1]/20"
            disabled={showMusicPrompt}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause Music" : "Play Music"}
          </Button>
        </motion.div>

        {/* Invitation Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {invitationCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <motion.div
                key={card.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={card.isAccessible ? { scale: 1.05, y: -5 } : {}}
                whileTap={card.isAccessible ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!showMusicPrompt && card.isAccessible) {
                    router.push(card.route)
                  }
                }}
              >
                <div
                  className={`backdrop-blur-sm rounded-2xl p-8 h-full border shadow-[0_4px_20px_rgba(244,143,177,0.1)] transition-all duration-300 ${
                    card.isConfirmed ? "bg-[#F48FB1]/20 border-[#E91E63]" : "bg-black/20 border-[#F48FB1]/20"
                  } ${
                    showMusicPrompt || !card.isAccessible
                      ? "opacity-50 cursor-not-allowed"
                      : "group-hover:shadow-[0_8px_30px_rgba(244,143,177,0.2)]"
                  }`}
                >
                  {/* Lock indicator for inaccessible cards */}
                  {!card.isAccessible && (
                    <div className="absolute top-3 left-3 bg-red-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Confirmation Badge */}
                  {card.isConfirmed && (
                    <motion.div
                      className="absolute top-3 right-3 bg-[#E91E63] rounded-full p-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Star className="w-3 h-3 text-white" />
                    </motion.div>
                  )}

                  {/* Icon with gradient background */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-transform duration-300 ${
                      card.isAccessible ? "group-hover:scale-110" : ""
                    } ${card.isConfirmed ? "bg-white" : `bg-gradient-to-br ${card.gradient}`}`}
                    animate={
                      card.isAccessible
                        ? {
                            rotate: [0, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    <IconComponent className={`w-10 h-10 ${card.isConfirmed ? `text-[#E91E63]` : "text-white"}`} />
                  </motion.div>

                  {/* Content */}
                  <h3
                    className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                      card.isConfirmed
                        ? "text-[#F48FB1]"
                        : card.isAccessible
                          ? "text-white group-hover:text-[#F48FB1]"
                          : "text-white/50"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-base leading-relaxed mb-4 ${card.isAccessible ? "text-white/70" : "text-white/30"}`}
                  >
                    {card.description}
                  </p>

                  {/* Access indicator */}
                  {!card.isAccessible && (
                    <p className="text-red-400 text-sm font-medium">Complete previous sections first to unlock</p>
                  )}

                  {/* Hover indicator */}
                  {card.isAccessible && (
                    <motion.div
                      className="flex items-center text-[#F48FB1] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      {card.isConfirmed ? "View again" : "Click to explore"}
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Message */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-[#F48FB1] text-lg">
            <span>Made with love for your special day ✨</span>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-[#F48FB1] rounded-full opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#E91E63] rounded-full opacity-40"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
