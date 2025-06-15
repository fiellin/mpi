"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { confirmPage, isPageConfirmed } from "@/lib/confirmation"
import type { ConfirmationPage } from "@/lib/confirmation"
import { useRouter } from "next/navigation"

interface ConfirmationButtonProps {
  page: ConfirmationPage
  className?: string
  returnToInvitation?: boolean
}

export function ConfirmationButton({ page, className = "", returnToInvitation = false }: ConfirmationButtonProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check initial confirmation status
  useEffect(() => {
    setConfirmed(isPageConfirmed(page))
  }, [page])

  const handleConfirm = () => {
    setLoading(true)

    // Simulate a short loading state for better UX
    setTimeout(() => {
      confirmPage(page)
      setConfirmed(true)
      setLoading(false)

      // If returnToInvitation is true, navigate back to invitation page after a short delay
      if (returnToInvitation) {
        setTimeout(() => {
          router.push("/invitation")
        }, 1000)
      }
    }, 800)
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {!confirmed ? (
        <>
          <p className="text-[#E91E63] text-sm mb-2">Please confirm you&apos;ve read this page</p>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-[#E91E63] hover:bg-[#C2185B] text-white transition-all duration-300"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            I&apos;ve Read This Page
          </Button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-[#C2185B] font-medium"
        >
          <div className="bg-[#F48FB1]/20 p-1 rounded-full">
            <Check className="w-4 h-4 text-[#C2185B]" />
          </div>
          <span>Page Confirmed</span>
          {returnToInvitation && (
            <motion.p
              className="text-[#E91E63] text-xs mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Returning to invitation...
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  )
}
