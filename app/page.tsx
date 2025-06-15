"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Gift } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PasscodePage() {
  const [passcode, setPasscode] = useState("")
  const [isWrong, setIsWrong] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate checking passcode
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (passcode.toLowerCase() === "kresnacakep") {
      setIsCorrect(true)
      setTimeout(() => {
        router.push("/invitation")
      }, 2000)
    } else {
      setIsWrong(true)
      setTimeout(() => {
        setIsWrong(false)
        setPasscode("")
      }, 1500)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] via-[#1A1A3A] to-[#2D1B69] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[#F48FB1]/10"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div
        className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 max-w-md w-full relative border border-[#F48FB1]/20"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-[#F48FB1]/20 rounded-full mb-4"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Gift className="w-8 h-8 text-[#F48FB1]" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-2">Secret Invitation</h1>
          <p className="text-[#F48FB1]/80 text-lg">Enter the secret code to unlock your special surprise...</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <div className="relative">
            <motion.div animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 2.0 }}>
              <Input
                type="password"
                placeholder="Enter the secret code..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full px-4 py-3 text-lg rounded-2xl border-2 transition-all duration-300 bg-black/20 backdrop-blur-sm ${
                  isWrong
                    ? "border-red-400 focus:border-red-500"
                    : isCorrect
                      ? "border-[#E91E63] focus:border-[#E91E63]"
                      : "border-[#F48FB1]/30 focus:border-[#F48FB1] hover:border-[#F48FB1]/50"
                } focus:ring-2 focus:ring-[#F48FB1]/20 text-white placeholder:text-[#F48FB1]/60`}
                disabled={isLoading || isCorrect}
              />
            </motion.div>

            <AnimatePresence>
              {isWrong && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm mt-2 text-center"
                >
                  Hmm, that's not right. Try again! 🤔
                </motion.p>
              )}
              {isCorrect && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#E91E63] text-sm mt-2 text-center flex items-center justify-center gap-1"
                >
                  Perfect! Welcome to your special surprise! <Heart className="w-4 h-4" />
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={!passcode || isLoading || isCorrect}
              className={`w-full py-3 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                isCorrect
                  ? "bg-[#E91E63] hover:bg-[#E91E63] text-white"
                  : "bg-[#F48FB1] hover:bg-[#E91E63] text-white hover:shadow-[0_4px_20px_rgba(244,143,177,0.3)]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Checking...
                </motion.div>
              ) : isCorrect ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Heart className="w-5 h-5" />
                  Unlocked!
                </motion.div>
              ) : (
                "Unlock Your Surprise"
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Hint */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-[#F48FB1]/70 text-sm">💡 Hint: kata yang menggambarkan aku</p>
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

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {isCorrect && (
          <motion.div
            className="fixed inset-0 bg-[#F48FB1]/20 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="text-8xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                ✨
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2">Welcome, Sofia!</h2>
              <p className="text-[#F48FB1] text-xl">Preparing your special surprise...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
