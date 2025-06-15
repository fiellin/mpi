"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, Heart, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { confirmPage } from "@/lib/confirmation"

export default function PhotoboothPage() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showFinalScene, setShowFinalScene] = useState(false)
  const [showUnlockButton, setShowUnlockButton] = useState(false)

  // Placeholder for photobooth images - you'll replace these with actual images
  const photoboothImages = [
    { src: "/images/photobooth1.jpg", alt: "Photobooth 1" },
    { src: "/images/photobooth2.jpg", alt: "Photobooth 2" },
    { src: "/images/photobooth3.jpg", alt: "Photobooth 3" },
    { src: "/images/photobooth4.jpg", alt: "Photobooth 4" },
    { src: "/images/photobooth5.jpg", alt: "Photobooth 5" },
    { src: "/images/photobooth6.jpg", alt: "Photobooth 6" },
    { src: "/images/photobooth7.jpg", alt: "Photobooth 7" },
    { src: "/images/photobooth8.jpg", alt: "Photobooth 8" },
    { src: "/images/photobooth9.jpg", alt: "Photobooth 9" },
    { src: "/images/photobooth10.jpg", alt: "Photobooth 10" },
    { src: "/images/photobooth11.jpg", alt: "Photobooth 11" },
    { src: "/images/photobooth12.jpg", alt: "Photobooth 12" },
  ]

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const handleShowFinalScene = () => {
    setShowFinalScene(true)
  }

  const handleUnlockWish = () => {
    // Confirm our-story page to unlock the wish page
    confirmPage("our-story")
    router.push("/invitation")
  }

  const handleBackToInvitation = () => {
    router.push("/invitation")
  }

  // Show unlock button after final scene
  useEffect(() => {
    if (showFinalScene) {
      const timer = setTimeout(() => {
        setShowUnlockButton(true)
      }, 3000) // 3 seconds after final scene

      return () => clearTimeout(timer)
    }
  }, [showFinalScene])

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
      <div className="max-w-6xl mx-auto pt-16 pb-8">
        <AnimatePresence mode="wait">
          {!showFinalScene ? (
            <motion.div
              key="photobooth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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
                  <Heart className="w-8 h-8 text-[#F48FB1]" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white mb-4">Photobooth Memories</h1>
                <p className="text-[#F48FB1]/80 text-lg mb-2">
                  paling lucu photobooth sih, ini aku kasih disini semua aja yg lucu lucu biar kamu ikutan gemash juga
                  :p
                </p>
              </motion.div>

              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Photo Grid */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
                  {photoboothImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="cursor-pointer group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openImageModal(image.src)}
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-[#F48FB1]/20 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-32 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                            Click to enlarge
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-white/70 text-sm mb-6">Click any photo to see it in full size</p>

                  {/* Continue Button */}
                  <Button
                    onClick={handleShowFinalScene}
                    className="bg-[#F48FB1] hover:bg-[#E91E63] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
                  >
                    Continue
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="final-scene"
              className="flex items-center justify-center min-h-[60vh]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 border border-[#F48FB1]/20 text-center max-w-2xl">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src="/images/blue.jpg"
                    alt="Blue background"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg border border-[#F48FB1]/20 mb-4"
                  />
                </motion.div>

                <motion.p
                  className="text-white text-xl leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  next photo background biru kayak gini kah? aamiin yaaaa
                </motion.p>

                <AnimatePresence>
                  {showUnlockButton && (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 bg-[#F48FB1]/20 rounded-full mb-4"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Star className="w-6 h-6 text-[#F48FB1]" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-4">Story Complete! 🎉</h3>
                      <p className="text-[#F48FB1]/80 text-lg mb-6">
                        You've finished our story! Ready to unlock the next surprise?
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={handleUnlockWish}
                          className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(233,30,99,0.3)]"
                        >
                          <Star className="w-5 h-5 mr-2" />
                          Continue to "apa ini hayo :p"
                        </Button>

                        <Button
                          onClick={handleBackToInvitation}
                          variant="outline"
                          className="border-[#F48FB1]/30 text-[#F48FB1] hover:bg-[#F48FB1]/20 px-8 py-3 rounded-full text-lg font-medium"
                        >
                          Back to Main Page
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                alt="Enlarged photobooth"
                className="w-full h-auto rounded-2xl shadow-2xl border border-[#F48FB1]/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
