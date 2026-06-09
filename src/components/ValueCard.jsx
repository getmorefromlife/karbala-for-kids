"use client";

import { motion } from "framer-motion";

export default function ValueCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow overflow-hidden"
    >
      <div
        className="h-2"
        style={{ backgroundColor: item.color }}
      />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{item.emoji}</span>
          <h3
            className="font-fredoka text-xl"
            style={{ color: item.color }}
          >
            {item.title}
          </h3>
        </div>

        <p className="font-nunito text-sm text-brown/70 mb-4 leading-relaxed">
          {item.summary}
        </p>

        <div className="rounded-xl bg-amber-50 p-4 mb-4 border border-amber-200">
          <p className="font-nunito text-sm font-bold text-amber-800 mb-1">
            💭 Think About It:
          </p>
          <p className="font-nunito text-sm text-amber-700">
            {item.prompt}
          </p>
        </div>

        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ backgroundColor: `${item.color}10` }}
        >
          <span className="text-2xl flex-shrink-0">🎨</span>
          <div>
            <p className="font-nunito text-xs font-bold mb-0.5" style={{ color: item.color }}>
              Try This Activity:
            </p>
            <p className="font-nunito text-sm" style={{ color: `${item.color}CC` }}>
              {item.activity}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
