"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Sparkles, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SurprisePage() {
  const router = useRouter()
  const [showMessage, setShowMessage] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [response, setResponse] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleOpenEnvelope = () => {
    setShowEnvelope(false)
    setTimeout(() => {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (response.toUpperCase() === "ACCEPT MISSION") {
      setSubmitted(true)
      setTimeout(() => {
        setShowConfetti(true)
        setTimeout(() => {
          setShowConfetti(false)
          router.push("/invitation")
        }, 3000)
      }, 300)
    }
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

      {/* Back Button */}
      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/invitation")}
          className="text-[#F48FB1] hover:text-white hover:bg-[#F48FB1]/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Invitation
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-16">
        <AnimatePresence>
          {showEnvelope ? (
            <motion.div
              className="flex flex-col items-center justify-center h-[70vh]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative w-64 h-48 md:w-80 md:h-60 bg-black/40 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer border border-[#F48FB1]/20"
                whileHover={{ scale: 1.05 }}
                onClick={handleOpenEnvelope}
              >
                {/* Envelope Flap */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 bg-[#E91E63] rounded-t-lg origin-bottom"
                  initial={{ rotateX: 0 }}
                  whileHover={{ rotateX: -20 }}
                  style={{ transformStyle: "preserve-3d", zIndex: 10 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Envelope Body */}
                <div className="absolute inset-0 flex items-center justify-center pt-8">
                  <motion.div
                    className="text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="font-medium mb-2">CLASSIFIED DOCUMENT</p>
                    <p className="text-sm text-[#F48FB1]">TOP SECRET - CLICK TO OPEN</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 text-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg">Recruitment Initiative: Operation Jakarta</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center min-h-[70vh] px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(244,143,177,0.15)] p-8 md:p-12 max-w-2xl w-full border border-[#F48FB1]/20 text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
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

                    {/* Sparkles Icon */}
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
                      <Sparkles className="w-8 h-8 text-[#F48FB1]" />
                    </motion.div>

                    {/* Message Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <motion.div
                        className="flex items-center justify-center gap-3 mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <Shield className="w-8 h-8 text-[#F48FB1]" />
                        <h2 className="text-3xl font-bold text-white">OFFICIAL NOTICE</h2>
                        <Shield className="w-8 h-8 text-[#F48FB1]" />
                      </motion.div>

                      <h\
