"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConfirmationButton } from "@/components/confirmation-button"

export default function DresscodePage() {
  const router = useRouter()

  const outfitSuggestions = [
    {
      category: "Comfortable Walking",
      items: [
        "Comfortable sneakers with good support",
        "Breathable clothing for all-day wear",
        "Small backpack for personal items",
      ],
      icon: "👟",
      color: "#C2185B",
    },
    {
      category: "Ice Skating Ready",
      items: [
        "Extra pair of thick socks",
        "Gloves to protect hands when falling",
        "Leggings/pants you can move freely in",
      ],
      icon: "🧤",
      color: "#E91E63",
    },
    {
      category: "Weather Appropriate",
      items: ["Light jacket for evening at PIK", "Sun protection (hat/sunscreen)", "Small towel for after skating"],
      icon: "☀️",
      color: "#F48FB1",
    },
    {
      category: "Practical Essentials",
      items: [
        "Change of clothes for after activities",
        "Portable charger for your phone",
        "Comfortable outfit for dinner at Cove",
      ],
      icon: "🔋",
      color: "#F3E5F5",
    },
  ]

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

        <div className="text-center mb-8">
          <motion.div
            className="text-6xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            👗
          </motion.div>

          <h1 className="text-4xl font-bold text-[#880E4F] mb-4">Dress Code</h1>
          <p className="text-[#E91E63] text-xl mb-6">Comfortable, Practical & Adventure-Ready</p>

          <motion.div
            className="bg-white/70 rounded-xl p-4 shadow-md mx-auto max-w-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-[#880E4F] font-medium mb-2">Weather Forecast:</p>
            <img
              src="/image/data_cuaca.png"
              alt="Weather forecast showing 31°C, cloudy with 20% precipitation chance"
              className="w-full h-auto mx-auto rounded-lg"
            />
            <p className="text-[#F3E5F5] text-sm mt-2">
              Dress appropriately for hot, humid weather with a chance of light rain
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {outfitSuggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.category}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E91E63]/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{suggestion.icon}</div>
                <h3 className="text-xl font-semibold text-[#880E4F]">{suggestion.category}</h3>
              </div>
              <ul className="space-y-2">
                {suggestion.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[#F3E5F5] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E91E63]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 mb-8">
          <p className="text-[#E91E63] text-lg mb-2">Most importantly, wear something that makes you feel amazing! </p>
          <p className="text-[#F3E5F5] text-sm">
            Remember: We&apos;ll be out all day from morning to evening, with activities ranging from tea ceremony to
            ice skating and dinner, so plan your outfit accordingly!
          </p>
        </div>

        {/* Confirmation Button */}
        <div className="flex justify-center mt-8">
          <ConfirmationButton page="dresscode" returnToInvitation={true} />
        </div>
      </motion.div>
    </div>
  )
}
