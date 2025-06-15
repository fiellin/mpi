"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConfirmationButton } from "@/components/confirmation-button"

export default function DateTimePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCE4EC] via-[#FCE4EC] to-[#F48FB1]/20 p-4 flex items-center justify-center">
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(53,71,49,0.15)] p-8 md:p-12 max-w-2xl w-full border border-[#E91E63]/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-[#E91E63] hover:text-[#880E4F] hover:bg-[#F48FB1]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="text-center">
          <motion.div
            className="text-6xl mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            📅
          </motion.div>

          <h1 className="text-4xl font-bold text-[#880E4F] mb-6">Date & Time</h1>

          <div className="space-y-6">
            <div className="bg-[#F48FB1]/10 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Calendar className="w-6 h-6 text-[#E91E63]" />
                <h2 className="text-2xl font-semibold text-[#880E4F]">This Sunday</h2>
              </div>
              <p className="text-[#F3E5F5] text-lg">June 1st, 2025</p>
            </div>

            <div className="bg-[#F48FB1]/10 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sun className="w-6 h-6 text-[#E91E63]" />
                <h2 className="text-2xl font-semibold text-[#880E4F]">Full Day Anomaly Slayer</h2>
              </div>
              <p className="text-[#F3E5F5] text-lg">8:30 AM - 8:30 PM</p>
            </div>
          </div>

          <p className="text-[#E91E63] text-lg mt-8 mb-8">A whole day to explore and capture anomaly in Jakarta! ✨</p>

          {/* Confirmation Button */}
          <ConfirmationButton page="datetime" className="mt-8" returnToInvitation={true} />
        </div>
      </motion.div>
    </div>
  )
}
