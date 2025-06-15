"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, Clock, MapPin, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { confirmPage } from "@/lib/confirmation"

export default function SpecialInvitationPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [confirmationText, setConfirmationText] = useState("")
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  // Target date: December 18, 2024, 8:00 PM
  const targetDate = new Date("2025-06-18T20:00:00").getTime()

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const handleConfirmation = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmationText.toLowerCase() === "kangen") {
      confirmPage("special-invitation")
      setShowFinalMessage(true)
    }
  }

  const handleFinish = () => {
    router.push("/invitation")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] via-[#1A1A3A] to-[#2D1B69] p-4 relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
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
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-[#F48FB1] hover:text-white hover:bg-[#F48FB1]/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-16 pb-8">
        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="invitation"
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
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
                  <Calendar className="w-8 h-8 text-[#F48FB1]" />
                </motion.div>

                <h1 className="text-4xl font-bold text-white mb-6">special dinner invitation</h1>
              </motion.div>

              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Invitation Text */}
                <motion.p
                  className="text-white text-xl md:text-2xl leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Would you join me for a special dinner under the stars? A night just for us, where time stands still
                  and every moment feels like magic ✨
                </motion.p>

                {/* Event Details */}
                <motion.div
                  className="grid md:grid-cols-4 gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <div className="bg-[#F48FB1]/10 rounded-2xl p-6">
                    <Calendar className="w-8 h-8 text-[#F48FB1] mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">Date</h3>
                    <p className="text-[#F48FB1]">June 18, 2025</p>
                  </div>

                  <div className="bg-[#F48FB1]/10 rounded-2xl p-6">
                    <Clock className="w-8 h-8 text-[#F48FB1] mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">Time</h3>
                    <p className="text-[#F48FB1]">8:00 PM</p>
                  </div>

                  <div className="bg-[#F48FB1]/10 rounded-2xl p-6">
                    <MapPin className="w-8 h-8 text-[#F48FB1] mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">Location</h3>
                    <p className="text-[#F48FB1]">Secret Location 🤫</p>
                  </div>

                  <div className="bg-[#F48FB1]/10 rounded-2xl p-6">
                    <svg className="w-8 h-8 text-[#F48FB1] mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-white font-semibold mb-2">Dress Code</h3>
                    <p className="text-[#F48FB1]">ure the one that choose the dresscode :p</p>
                  </div>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Countdown to Our Special Dinner</h3>
                  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="bg-[#E91E63]/20 rounded-xl p-4 border border-[#F48FB1]/20"
                        animate={{
                          scale: item.label === "Seconds" ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                          duration: 1,
                          repeat: item.label === "Seconds" ? Number.POSITIVE_INFINITY : 0,
                        }}
                      >
                        <div className="text-2xl md:text-3xl font-bold text-[#F48FB1] mb-1">
                          {item.value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-white/70 text-sm">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Confirmation Section */}
                <motion.div
                  className="border-t border-[#F48FB1]/20 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    harus hadir, kalau mau hadir harus ketik 'kangen'
                  </h3>

                  <form onSubmit={handleConfirmation} className="max-w-md mx-auto">
                    <div className="flex gap-4">
                      <Input
                        type="text"
                        placeholder="Type your response..."
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="flex-1 px-4 py-3 text-lg rounded-2xl border-2 border-[#F48FB1]/30 focus:border-[#F48FB1] bg-black/20 backdrop-blur-sm text-white placeholder:text-[#F48FB1]/60"
                      />
                      <Button
                        type="submit"
                        className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>

                  {confirmationText && confirmationText.toLowerCase() !== "kangen" && (
                    <motion.p className="text-red-400 text-sm mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Hmm, that's not quite right... 🤔
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="final-message"
              className="flex items-center justify-center min-h-[60vh]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20 text-center max-w-2xl">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-[#F48FB1]/20 rounded-full mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-8 h-8 text-[#F48FB1]" />
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-6">Perfect! 💕</h2>
                <p className="text-white text-xl leading-relaxed mb-8">
                  Aku juga kangen sama kamu. Thank you for going through this special journey with me. I can't wait to
                  celebrate with you on June 18th, 2025!
                </p>

                <motion.p
                  className="text-[#F48FB1] text-lg mb-8"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  See you soon, beautiful ✨
                </motion.p>

                <Button
                  onClick={handleFinish}
                  className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
                >
                  Complete Journey
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
