"use client"

import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Clock, Navigation, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ConfirmationButton } from "@/components/confirmation-button"
import { InteractiveMap } from "@/components/interactive-map"

export default function LocationPage() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  // Updated Jakarta locations and itinerary
  const locations = [
    {
      id: 1,
      name: "Cawang Station",
      address: "Jl. Dewi Sartika, Cawang, East Jakarta",
      time: "08:30",
      description:
        "Our meeting point! Please arrive on time as we&apos;ll have 30 minutes to travel to our next destination. No excuse for late comings!",
      coordinates: { lat: -6.2425, lng: 106.8584 },
      color: "#C2185B",
    },
    {
      id: 2,
      name: "Hakuji Tearoom Kemang",
      address: "Jl. Kemang Raya, Kemang, South Jakarta",
      time: "09:00 - 11:00",
      description:
        "Breakfast and authentic Matcha Ceremony experience in this beautiful Japanese tearoom. Don&apos;t miss it! It&apos;s already booked for us. ",
      coordinates: { lat: -6.2607, lng: 106.8135 },
      color: "#E91E63",
    },
    {
      id: 3,
      name: "Mall Taman Anggrek",
      address: "Jl. Letjen S. Parman, West Jakarta",
      time: "11:00 - 14:30",
      description:
        "Ice skating at Skyrink! We&apos;ll have time for prayer and preparation before our skating session.",
      coordinates: { lat: -6.1785, lng: 106.7931 },
      color: "#F48FB1",
    },
    {
      id: 4,
      name: "Central Park Mall",
      address: "Jl. Letjen S. Parman, West Jakarta",
      time: "14:30 - 16:00",
      description: "Lunch and Ashar prayer time at this beautiful mall connected to Taman Anggrek.",
      coordinates: { lat: -6.1774, lng: 106.7912 },
      color: "#F3E5F5",
    },
    {
      id: 5,
      name: "Aloha PIK 2",
      address:
        "Jalan Laksamana Yos Sudarso, Pantai Indah Kapuk 2, Kosambi Barat, Kosambi, Tangerang Regency, Banten, Java, 11810, Indonesia",
      time: "17:00 - 19:00",
      description: "Evening relaxation at this beautiful beachfront area with stunning sunset views over the water.",
      coordinates: { lat: -6.071403343914621, lng: 106.71224622589074 },
      color: "#C2185B",
    },
    {
      id: 6,
      name: "Cove at Batavia",
      address: "PIK Icon, Golf Island, Kawasan Pantai Maju, Jakarta 14460",
      time: "19:00 - 20:30",
      description: "Dinner at this charming restaurant with beautiful ambience and delicious cuisine.",
      coordinates: { lat: -6.089031339041901, lng: 106.74089732194092 },
      color: "#E91E63",
    },
    {
      id: 7,
      name: "Jakarta Kota Station",
      address: "Jl. Lada No.1, West Jakarta",
      time: "20:30 onwards",
      description: "Our final stop where we&apos;ll end our adventure together.",
      coordinates: { lat: -6.1377, lng: 106.8139 },
      color: "#F48FB1",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCE4EC] via-[#FCE4EC] to-[#F48FB1]/20 p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-[#E91E63] hover:text-[#880E4F] hover:bg-[#F48FB1]/10 relative z-20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#880E4F]">Jakarta Anomaly Map</h1>
            <p className="text-[#F3E5F5] text-lg">Capture anomaly in Jakarta</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interactive Map Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(53,71,49,0.15)] p-6 border border-[#E91E63]/20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F48FB1]/20 rounded-full flex items-center justify-center">
                <Navigation className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-2xl font-bold text-[#880E4F]">Jakarta Anomaly Map</h2>
            </div>

            <InteractiveMap
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
            />
          </motion.div>

          {/* Locations List */}
          <motion.div
            className="space-y-4 max-h-[700px] overflow-y-auto pr-2 styled-scrollbar"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6 sticky top-0 bg-[#FCE4EC]/80 backdrop-blur-sm py-2 z-10">
              <div className="w-10 h-10 bg-[#F48FB1]/20 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-2xl font-bold text-[#880E4F]">Jakarta Anomaly Itinerary</h2>
            </div>

            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border shadow-[0_4px_20px_rgba(53,71,49,0.1)] cursor-pointer hover:shadow-[0_8px_30px_rgba(53,71,49,0.15)] transition-all duration-300 ${
                  selectedLocation === location.id ? "border-[#C2185B] bg-[#C2185B]/5" : "border-[#E91E63]/20"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-full border-3 border-white shadow-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: location.color }}
                    animate={selectedLocation === location.id ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white font-bold">{location.id}</span>
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#880E4F] mb-1">{location.name}</h3>
                    <div className="flex items-center gap-2 text-[#E91E63] text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{location.time}</span>
                    </div>
                    <p className="text-[#F3E5F5] text-sm mb-2">{location.address}</p>
                    <p className="text-[#880E4F] text-sm">{location.description}</p>

                    {/* Special Menu Button for Hakuji Tearoom */}
                    {location.id === 2 && (
                      <motion.a
                        href="https://drive.google.com/file/d/16qG3lfZMbxc8Anf8mM37VY9ciSweTIoY/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#E91E63] hover:bg-[#C2185B] text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Menu
                      </motion.a>
                    )}

                    {/* Special Instagram Button for Skyrink */}
                    {location.id === 3 && (
                      <motion.a
                        href="https://www.instagram.com/skyrink_jakarta/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#F48FB1] hover:bg-[#C2185B] text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Skyrink Instagram
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Transportation info for locations that have travel time */}
                {index < locations.length - 1 && (
                  <div className="mt-4 pt-3 border-t border-[#E91E63]/10">
                    <div className="flex items-center gap-2 text-[#F3E5F5] text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#E91E63]"
                      >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                        <circle cx="7" cy="17" r="2" />
                        <path d="M9 17h6" />
                        <circle cx="17" cy="17" r="2" />
                      </svg>
                      <span>
                        {index === 0
                          ? "30 min travel to next destination"
                          : index === 2
                            ? "Short walk to next destination"
                            : index === 4
                              ? "Travel to Harmony Golf area"
                              : index === 5
                                ? "Travel to final destination"
                                : "Travel to next destination"}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-[#E91E63] text-lg">
            <span>A perfect day slaying Jakarta&apos;s anomalies together</span>
          </div>
        </motion.div>

        {/* Confirmation Button */}
        <div className="flex justify-center mt-8 relative z-20">
          <ConfirmationButton page="location" returnToInvitation={true} />
        </div>
      </div>
    </div>
  )
}
