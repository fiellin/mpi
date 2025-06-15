"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { confirmPage } from "@/lib/confirmation"

export default function OurStoryPage() {
  const router = useRouter()
  const [currentStory, setCurrentStory] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const stories = [
    {
      id: 1,
      text: "kita ketemu di bumble, ini chatan pertama kita, ga nyangka sih aku bisa lanjut padahal selalu remehin aplikasi dating apps haha.",
      image: "/images/bumble.jpg",
      imageAlt: "Bumble chat screenshot",
    },
    {
      id: 2,
      text: "inget ga first date kamu ngatain aku alay :(( tapi setelah dipikir pikir iya juga sih apa banget pakaiannya haha, terus kamu",
      image: "/images/bxsea.jpg",
      imageAlt: "First date photo",
    },
    {
      id: 3,
      text: "terus aku jemput kamu ke muara angke, AKU NUNGGUIN KAMU 1 JAM :') tapi gapapa, karena pada akhirnya kita main switch bareng, ini seru banget karena pertama kali buat aku, buat kamu sih engga ya :p. ga ada foto main switch di hp ku, di kamu pasti ada jadi upload ini aja haha",
      image: "/images/switch.jpg",
      imageAlt: "Nintendo Switch gaming",
    },
    {
      id: 4,
      text: "terus kita ke blok M, naik MRT bareng, kamu nemenin ngajakin aku liat city skylight pertama kali, dan PHOTOBOOTH haha.",
      images: [{ src: "/images/blokM.jpg", alt: "Blok M" }],
    },
    {
      id: 5,
      text: "sebenarnya masih banyak moment kita walaupun baru bentar ya, tapi panjang dan aku capek buatnya wkwk, tapi paling lucu photobooth, langsung ke sana ah ah ya :p",
      image: null,
      imageAlt: "",
    },
    {
      id: 6,
      text: "Chapter 6: Photobooth Memories - paling lucu photobooth sih, ini aku kasih disini semua aja yg lucu lucu biar kamu ikutan gemash juga :p",
      isPhotobooth: true,
    },
  ]

  const handleNext = () => {
    if (currentStory < stories.length - 1) {
      if (currentStory === 4) {
        // After story 5, go to photobooth
        router.push("/photobooth")
      } else {
        setCurrentStory(currentStory + 1)
      }
    } else if (currentStory === 5) {
      // This is the photobooth chapter, go to photobooth
      router.push("/photobooth")
    } else {
      // Show confirmation options at the end
      setShowConfirmation(true)
    }
  }

  const handlePrev = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1)
    }
  }

  const handleConfirmStory = () => {
    // Confirm our-story page to unlock the wish page
    confirmPage("our-story")

    // Force a state update to ensure the confirmation is registered
    setTimeout(() => {
      // Trigger a storage event to update other components
      window.dispatchEvent(new Event("storage"))

      setTimeout(() => {
        router.push("/invitation")
      }, 500)
    }, 100)
  }

  const handleGoToPhotobooth = () => {
    // Go to photobooth without confirming yet - confirmation happens after photobooth
    router.push("/photobooth")
  }

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
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
      <div className="max-w-4xl mx-auto pt-16 pb-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-[#F48FB1]/80 text-lg">
            Chapter {currentStory + 1} of {stories.length}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showConfirmation ? (
            <motion.div
              key={currentStory}
              className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div>
                  <motion.p
                    className="text-white text-lg leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {stories[currentStory].text}
                  </motion.p>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handlePrev}
                      disabled={currentStory === 0}
                      variant="outline"
                      className="border-[#F48FB1]/30 text-[#F48FB1] hover:bg-[#F48FB1]/20 disabled:opacity-30"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={handleNext} className="bg-[#F48FB1] hover:bg-[#E91E63] text-white">
                      {currentStory === stories.length - 1 ? "Finish Story" : "Next"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Image Content */}
                <div className="space-y-4">
                  {stories[currentStory].image ? (
                    <motion.div
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openImageModal(stories[currentStory].image!)}
                    >
                      <img
                        src={stories[currentStory].image || "/placeholder.svg"}
                        alt={stories[currentStory].imageAlt}
                        className="w-full h-auto rounded-2xl shadow-lg border border-[#F48FB1]/20"
                      />
                      <p className="text-[#F48FB1]/60 text-sm text-center mt-2">Click to enlarge</p>
                    </motion.div>
                  ) : stories[currentStory].images ? (
                    <div className="grid grid-cols-1 gap-4">
                      {stories[currentStory].images?.map((img, index) => (
                        <motion.div
                          key={index}
                          className="cursor-pointer"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => openImageModal(img.src)}
                        >
                          <img
                            src={img.src || "/placeholder.svg"}
                            alt={img.alt}
                            className="w-full h-48 object-cover rounded-2xl shadow-lg border border-[#F48FB1]/20"
                          />
                        </motion.div>
                      ))}
                      <p className="text-[#F48FB1]/60 text-sm text-center">Click images to enlarge</p>
                    </div>
                  ) : (
                    // For story 5 (no image)
                    <motion.div
                      className="flex items-center justify-center h-64 bg-black/20 rounded-2xl border border-[#F48FB1]/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-6xl mb-4"
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          📸
                        </motion.div>
                        <p className="text-[#F48FB1] text-lg">Ready for photobooth memories?</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            // Confirmation Screen
            <motion.div
              key="confirmation"
              className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
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
                <Star className="w-8 h-8 text-[#F48FB1]" />
              </motion.div>

              <h2 className="text-3xl font-bold text-white mb-4">Story Complete! 🎉</h2>
              <p className="text-[#F48FB1]/80 text-lg mb-8">
                You've finished reading our story! What would you like to do next?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleConfirmStory}
                  className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(233,30,99,0.3)]"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Continue to "apa ini hayo :p"
                </Button>

                <Button
                  onClick={handleGoToPhotobooth}
                  variant="outline"
                  className="border-[#F48FB1]/30 text-[#F48FB1] hover:bg-[#F48FB1]/20 px-8 py-3 rounded-full text-lg font-medium"
                >
                  📸 Continue to Photobooth
                </Button>
              </div>

              <p className="text-white/60 text-sm mt-6">
                Tip: Click "Continue" to access the next page in your journey!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator - only show when not in confirmation */}
        {!showConfirmation && (
          <motion.div
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {stories.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStory ? "bg-[#F48FB1]" : "bg-white/20"
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                onClick={closeImageModal}
                variant="ghost"
                size="sm"
                className="absolute -top-12 right-0 text-white hover:text-[#F48FB1] hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Enlarged view"
                className="w-full h-auto rounded-2xl shadow-2xl border border-[#F48FB1]/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
