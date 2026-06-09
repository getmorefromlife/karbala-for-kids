"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventCard({ event, phaseColor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">{event.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-sm sm:text-base font-fredoka font-bold px-3 py-1 rounded-full text-white shadow-sm"
                style={{ backgroundColor: phaseColor }}
              >
                {event.date}
              </span>
              {event.ageTag && (
                <span className="text-xs sm:text-sm font-nunito font-semibold text-brown/50 bg-brown/5 px-2 py-0.5 rounded-full">
                  Ages {event.ageTag}
                </span>
              )}
            </div>
            <h4 className="font-fredoka text-base sm:text-lg text-brown-dark">
              {event.title}
            </h4>
            <p className="font-nunito text-sm text-brown/80">
              {event.summary}
            </p>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-brown/40 text-lg flex-shrink-0 mt-1"
          >
            ▼
          </motion.span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="font-nunito text-sm text-brown/70 mt-3 pt-3 border-t border-amber-100 leading-relaxed">
                {event.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
