"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { confirmPage } from "@/lib/confirmation"

type Scene =
  | "day"
  | "transition"
  | "night"
  | "fireworks"
  | "shooting-star"
  | "shooting-star-message"
  | "multiple-stars-question"
  | "multiple-stars"
  | "final"

export default function WishPage() {
  const router = useRouter()
  const [scene, setScene] = useState<Scene>("day")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [showShootingStar, setShowShootingStar] = useState(false)
  const [showMultipleStars, setShowMultipleStars] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdownNumber, setCountdownNumber] = useState(3)

  const dayTexts = [
    "hi mpii, coba liat ini deh",
    "kotanya cantik ya",
    "kotanya tenang ga kayak jatiwaringin yang selalu macet 😄",
    "kota ini tentram, damai, yang selalu aku impiin",
    "ya walaupun sebenernya enakan tinggal di desa sih lebih tenang wkwk",
    "tapi kota ini special, tau ga kenapa?",
    "yak betul karena kamu suka perkotaan",
    "eh tapi sukanya city skylight pas malam hari ya?",
    "yauda jadi kita tunggu lagi 8 jam biar jadi malam hari ya",
    "ga deng bercanda :p, coba klik mataharinya deh",
  ]

  const nightTexts = [
    "gimana? lebih cantik kan?",
    "tapi masih ada yang kurang ya? langitnya sepi banget",
    "let me show you how magical this night would be",
    "siap ga?",
    "1",
    "2",
    "3",
  ]

  const fireworksTexts = [
    "HAPPY BIRTHDAY YA",
    "kadonya udah aku kasih tadi bintang bintang, jumlahnya ada 499, itung deh kalau ga percaya :p",
    "aku mau nambahin 1 lagi, lihat deh",
  ]

  const shootingStarMessageTexts = ["tuh ada bintang jatuh, harusnya kamu berdoa tadi, sempet doa ga tadi?"]

  const multipleStarsQuestionTexts = ["mau lagi ga?"]

  const multipleStarsTexts = ["tuh buruan berdoa dulu buat dirikamu sendiri. baru tap layarnya lagi"]

  const finalTexts = [
    "udah? gantian ya aku yang ucapin",
    "SEMOGA di usia yang baru ini, hidup kamu dipenuhi dengan KEDAMAIAN, KEBAHAGIAAN yang tenang, dan pencapaian-pencapaian yang membuat kamu BANGGA pada diri sendiri",
    "SEMOGA langkah kamu selalu DIPERMUDAH, pintu-pintu baru terbuka untuk karier yang kamu impikan, dan semesta senantiasa MELINDUNGI kamu dalam setiap perjalanan",
    "SEMOGA hati kamu tetap HANGAT meski dunia kadang dingin, dan semoga kamu selalu dikelilingi oleh orang-orang yang TULUS dan MENDUKUNG.",
    "apa pun yang kamu cari, SEMOGA kamu menemukannya atau malah diberi yang LEBIH BAIK dari yang kamu bayangkan.",
    "SELAMAT BERTUMBUH ya sayang, dan selamat menjadi VERSI TERBAIK dari dirimu, sedikit demi sedikit, hari demi hari.",
    "itu aja :p",
    "I HOPE I could take part in yours. Parts, or even a CHAPTER ❤️",
  ]

  const getCurrentTexts = () => {
    switch (scene) {
      case "day":
        return dayTexts
      case "night":
        return nightTexts
      case "fireworks":
        return fireworksTexts
      case "shooting-star-message":
        return shootingStarMessageTexts
      case "multiple-stars-question":
        return multipleStarsQuestionTexts
      case "multiple-stars":
        return multipleStarsTexts
      case "final":
        return finalTexts
      default:
        return []
    }
  }

  const handleTextClick = () => {
    if (scene === "day" && currentTextIndex < dayTexts.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1)
    } else if (scene === "night") {
      if (currentTextIndex < nightTexts.length - 1) {
        if (currentTextIndex === 3) {
          // After "siap ga?"
          setIsCountingDown(true)
          startCountdown()
        } else {
          setCurrentTextIndex(currentTextIndex + 1)
        }
      }
    } else if (scene === "fireworks" && currentTextIndex < fireworksTexts.length - 1) {
      if (currentTextIndex === fireworksTexts.length - 2) {
        // Before last text, trigger shooting star
        setCurrentTextIndex(currentTextIndex + 1)
        setTimeout(() => {
          setShowShootingStar(true)
          setScene("shooting-star")
          // Wait for shooting star to finish, then show message
          setTimeout(() => {
            setScene("shooting-star-message")
            setCurrentTextIndex(0)
          }, 4000) // 4 seconds for shooting star animation
        }, 2000)
      } else {
        setCurrentTextIndex(currentTextIndex + 1)
      }
    } else if (scene === "multiple-stars" && currentTextIndex < multipleStarsTexts.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1)
    } else if (scene === "multiple-stars" && currentTextIndex === multipleStarsTexts.length - 1) {
      // Move to final scene
      setScene("final")
      setCurrentTextIndex(0)
    } else if (scene === "final" && currentTextIndex < finalTexts.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1)
    }
  }

  const startCountdown = () => {
    const countdown = setInterval(() => {
      setCountdownNumber((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          setIsCountingDown(false)
          setShowFireworks(true)
          setShowStars(true)
          setScene("fireworks")
          setCurrentTextIndex(0)
          return 3
        }
        return prev - 1
      })
    }, 1500) // Slower countdown - 1.5 seconds between numbers
  }

  const handleSunClick = () => {
    if (scene === "day" && currentTextIndex === dayTexts.length - 1) {
      setScene("transition")
      setTimeout(() => {
        setScene("night")
        setCurrentTextIndex(0)
      }, 2000)
    }
  }

  const handleShootingStarButton = () => {
    setScene("multiple-stars-question")
    setCurrentTextIndex(0)
  }

  const handleMultipleStarsButton = () => {
    setShowMultipleStars(true)
    setScene("multiple-stars")
    setCurrentTextIndex(0)
  }

  const handleContinueToMyWish = () => {
    // Confirm wish page and navigate to my-wish
    confirmPage("wish")
    router.push("/my-wish")
  }

  const isDaytime = scene === "day"
  const isTransition = scene === "transition"

  // Helper function to render text with uppercase styling
  const renderTextWithUppercase = (text: string) => {
    // Split text by uppercase words and render them with different styling
    const parts = text.split(/(\b[A-Z][A-Z\s]*[A-Z]\b|\b[A-Z]+\b)/)
    return parts.map((part, index) => {
      if (/^[A-Z][A-Z\s]*[A-Z]$|^[A-Z]+$/.test(part.trim())) {
        return (
          <span key={index} className="font-bold text-[#F48FB1]">
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden cursor-pointer" onClick={handleTextClick}>
      {/* Background */}
      <div
        className={`absolute inset-0 transition-all duration-2000 ${
          isDaytime
            ? "bg-gradient-to-b from-[#87CEEB] via-[#98D8E8] to-[#F0F8FF]"
            : "bg-gradient-to-b from-[#0F0F23] via-[#1A1A3A] to-[#2D1B69]"
        }`}
      >
        {/* Sun */}
        <AnimatePresence>
          {(isDaytime || isTransition) && (
            <motion.div
              className="absolute top-20 right-20 cursor-pointer"
              onClick={handleSunClick}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: 100 }}
              transition={{ duration: 2 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full shadow-[0_0_50px_rgba(255,215,0,0.6)]"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Sun className="w-12 h-12 text-[#FFD700] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-8 bg-[#FFD700] rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-50px)`,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Moon */}
        <AnimatePresence>
          {!isDaytime && !isTransition && (
            <motion.div
              className="absolute top-16 right-16"
              initial={{ opacity: 0, scale: 0.5, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-[#FFF8DC] to-[#F0E68C] rounded-full shadow-[0_0_50px_rgba(255,248,220,0.5)]"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Moon className="w-12 h-12 text-[#FFF8DC] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stars */}
        <AnimatePresence>
          {showStars && (
            <>
              {[...Array(499)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 70}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
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
            </>
          )}
        </AnimatePresence>

        {/* Enhanced Fireworks for Happy Birthday */}
        <AnimatePresence>
          {showFireworks && (
            <>
              {/* Main fireworks */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 50}%`,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 2.5, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                >
                  {[...Array(16)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-1 h-10 rounded-full"
                      style={{
                        backgroundColor: [
                          "#F48FB1",
                          "#E91E63",
                          "#C2185B",
                          "#FFD700",
                          "#FF69B4",
                          "#FF1493",
                          "#FF6347",
                          "#32CD32",
                        ][Math.floor(Math.random() * 8)],
                        transformOrigin: "0 0",
                        transform: `rotate(${j * 22.5}deg)`,
                      }}
                      animate={{
                        scaleY: [0, 1, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              ))}
              {/* Additional sparkle effects */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-2 h-2 bg-[#FFD700] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: Math.random() * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2 + Math.random() * 2,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Single Shooting Star */}
        <AnimatePresence>
          {showShootingStar && (
            <motion.div
              className="absolute w-2 h-2 bg-[#F48FB1] rounded-full"
              style={{
                top: "20%",
                left: "80%",
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: -window.innerWidth * 0.8,
                y: window.innerHeight * 0.6,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, ease: "easeOut" }}
              onAnimationComplete={() => setShowShootingStar(false)}
            >
              {/* Shooting star tail */}
              <motion.div
                className="absolute w-20 h-0.5 bg-gradient-to-r from-[#F48FB1] to-transparent rounded-full"
                style={{ right: "100%", top: "50%", transform: "translateY(-50%)" }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 4 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Multiple Shooting Stars - Continuous Shower */}
        <AnimatePresence>
          {showMultipleStars && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`shower-${i}`}
                  className="absolute w-2 h-2 bg-[#F48FB1] rounded-full"
                  style={{
                    top: `${-10 + Math.random() * 20}%`,
                    left: `${60 + Math.random() * 40}%`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: -window.innerWidth * (0.8 + Math.random() * 0.4),
                    y: window.innerHeight * (0.6 + Math.random() * 0.4),
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    ease: "easeOut",
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1 + Math.random() * 2,
                  }}
                >
                  <motion.div
                    className="absolute w-20 h-0.5 bg-gradient-to-r from-[#F48FB1] to-transparent rounded-full"
                    style={{ right: "100%", top: "50%", transform: "translateY(-50%)" }}
                  />
                </motion.div>
              ))}
              {/* Additional layer for denser shower */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`shower-extra-${i}`}
                  className="absolute w-1.5 h-1.5 bg-[#E91E63] rounded-full"
                  style={{
                    top: `${-5 + Math.random() * 15}%`,
                    left: `${70 + Math.random() * 30}%`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: -window.innerWidth * (0.7 + Math.random() * 0.3),
                    y: window.innerHeight * (0.5 + Math.random() * 0.3),
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 1.5,
                    ease: "easeOut",
                    delay: 0.5 + i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.5 + Math.random() * 1.5,
                  }}
                >
                  <motion.div
                    className="absolute w-16 h-0.5 bg-gradient-to-r from-[#E91E63] to-transparent rounded-full"
                    style={{ right: "100%", top: "50%", transform: "translateY(-50%)" }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* City Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute bottom-0 ${
                isDaytime
                  ? "bg-gradient-to-t from-[#4A5568] to-[#718096]"
                  : "bg-gradient-to-t from-[#1A1A2E] to-[#16213E]"
              }`}
              style={{
                left: `${i * 5}%`,
                width: `${4 + Math.random() * 6}%`,
                height: `${40 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
            >
              {/* Building windows */}
              {[...Array(Math.floor(Math.random() * 8) + 3)].map((_, j) => (
                <motion.div
                  key={j}
                  className={`absolute w-1 h-1 rounded-sm ${isDaytime ? "bg-[#2D3748]" : "bg-[#F48FB1]"}`}
                  style={{
                    left: `${20 + (j % 3) * 25}%`,
                    top: `${20 + Math.floor(j / 3) * 15}%`,
                  }}
                  animate={
                    !isDaytime
                      ? {
                          opacity: [0.3, 1, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            router.back()
          }}
          className={`${
            isDaytime
              ? "text-[#4A5568] hover:text-[#2D3748] hover:bg-white/20"
              : "text-[#F48FB1] hover:text-white hover:bg-[#F48FB1]/20"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Text Display */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="max-w-2xl mx-auto px-8">
          <AnimatePresence mode="wait">
            {isCountingDown ? (
              <motion.div
                key="countdown"
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.div
                  className="text-8xl font-bold text-[#F48FB1] mb-4"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 0.8 }}
                >
                  {countdownNumber}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={`${scene}-${currentTextIndex}`}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`text-xl md:text-2xl font-medium leading-relaxed ${
                    isDaytime ? "text-[#2D3748]" : "text-white"
                  } bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20`}
                >
                  {scene === "final"
                    ? renderTextWithUppercase(getCurrentTexts()[currentTextIndex])
                    : getCurrentTexts()[currentTextIndex]}
                </div>

                {scene !== "shooting-star-message" && scene !== "multiple-stars-question" && (
                  <div className={`mt-4 text-sm ${isDaytime ? "text-[#4A5568]" : "text-white/70"}`}>
                    {scene === "day" && currentTextIndex === dayTexts.length - 1
                      ? "Click the sun ☀️"
                      : "Tap anywhere to continue"}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Shooting Star Message Buttons */}
      <AnimatePresence>
        {scene === "shooting-star-message" && (
          <motion.div
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="flex gap-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShootingStarButton()
                }}
                className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-6 py-3 rounded-full"
              >
                GAKK
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShootingStarButton()
                }}
                className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-6 py-3 rounded-full"
              >
                ga sempet ihh
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multiple Stars Question Buttons */}
      <AnimatePresence>
        {scene === "multiple-stars-question" && (
          <motion.div
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="flex gap-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleMultipleStarsButton()
                }}
                className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-6 py-3 rounded-full"
              >
                MAUUUKKKK
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleMultipleStarsButton()
                }}
                className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-6 py-3 rounded-full"
              >
                mau bangettt buruan
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      <AnimatePresence>
        {scene === "final" && currentTextIndex === finalTexts.length - 1 && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <Button
              onClick={handleContinueToMyWish}
              className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(244,143,177,0.3)]"
            >
              Continue to "my wish for us"
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
