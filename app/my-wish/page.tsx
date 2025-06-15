"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { confirmPage } from "@/lib/confirmation"

export default function MyWishPage() {
  const router = useRouter()
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showContinueButton, setShowContinueButton] = useState(false)

  const fullText = `Doaku, semoga kita bisa terus saling menjaga rasa hormat dan saling dengar. Saat ada salah paham, semoga kita bisa saling memaafkan dan nggak buru-buru saling menjauh.

Aku tahu kamu belum siap sekarang, dan aku nggak buru-buru. Aku cuma berharap, kalau suatu hari kamu siap, aku masih jadi orang yang kamu percaya untuk jalan bareng.

Semoga kalau memang ada jalannya, kita bisa terus berjalan berdua — ke arah yang lebih baik, lebih tenang, dan lebih jelas.`

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 25) // Changed from 50ms to 25ms for faster typing

      return () => clearTimeout(timer)
    } else {
      // Show continue button after typing is complete
      setTimeout(() => {
        setShowContinueButton(true)
      }, 1000)
    }
  }, [currentIndex, fullText])

  const handleContinue = () => {
    confirmPage("my-wish")
    router.push("/invitation")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] via-[#1A1A3A] to-[#2D1B69] p-4 relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
      <div className="max-w-4xl mx-auto pt-16 pb-8 flex items-center justify-center min-h-[80vh]">
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
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
              <Heart className="w-8 h-8 text-[#F48FB1]" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-4">my wish for us</h1>
          </motion.div>

          {/* Typing Text */}
          <motion.div
            className="text-white text-lg md:text-xl leading-relaxed text-left max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="whitespace-pre-line">
              {displayedText}
              {currentIndex < fullText.length && (
                <motion.span
                  className="inline-block w-0.5 h-6 bg-[#F48FB1] ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </p>
          </motion.div>

          {/* Continue Button */}
          {showContinueButton && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Button
                onClick={handleContinue}
                className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(244,143,177,0.3)]"
              >
                Continue to "special invitation"
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
