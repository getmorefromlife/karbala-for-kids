"use client";

import { motion } from "framer-motion";

export default function CivicValueCard({ item, index, ui }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow overflow-hidden relative"
    >
      <div
        className="h-2"
        style={{ backgroundColor: item.color }}
      />
      {item.priority === "top" && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {ui.civicValues?.priorityHigh || "TOP PRIORITY"}
        </span>
      )}
      {item.priority === "new" && (
        <span className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {ui.civicValues?.priorityNew || "NEW"}
        </span>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{item.emoji}</span>
          <h3
            className="font-fredoka text-xl leading-tight"
            style={{ color: item.color }}
          >
            {item.title}
          </h3>
        </div>

        <div className="rounded-xl bg-rose-50 p-4 mb-3 border border-rose-200">
          <p className="font-nunito text-sm font-bold text-rose-800 mb-1">
            ⚠️ {ui.civicValues?.problem || "The Problem"}
          </p>
          <p className="font-nunito text-sm text-rose-700 leading-relaxed">
            {item.problem}
          </p>
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: `${item.color}10` }}
        >
          <p className="font-nunito text-sm font-bold mb-1" style={{ color: item.color }}>
            💡 {ui.civicValues?.lesson || "The Lesson"}
          </p>
          <p className="font-nunito text-sm leading-relaxed" style={{ color: `${item.color}CC` }}>
            {item.lesson}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
