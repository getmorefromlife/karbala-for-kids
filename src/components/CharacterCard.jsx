"use client";

import { motion } from "framer-motion";

export default function CharacterCard({ character }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow overflow-hidden group"
    >
      <div
        className="h-2"
        style={{ backgroundColor: character.color }}
      />
      <div className="p-5">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {character.emoji}
          </span>
          <div>
            <h3 className="font-fredoka text-lg text-brown-dark">
              {character.name}
            </h3>
            <span className="font-nunito text-sm text-brown/60 font-semibold">
              {character.role}
            </span>
          </div>
        </div>

        {character.isAntagonist && (
          <span className="inline-block font-nunito text-xs font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 mb-2">
            ⚠️ Difficult Role
          </span>
        )}

        <p className="font-nunito text-sm text-brown/70 mb-3 leading-relaxed">
          {character.description}
        </p>

        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: `${character.color}10` }}
        >
          <p className="font-nunito text-xs font-bold" style={{ color: character.color }}>
            💡 {character.teaching}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-nunito text-xs text-brown/50">👪</span>
          <span className="font-nunito text-xs text-brown/50">
            {character.relationship}
          </span>
          <span className="font-nunito text-xs text-brown/30 ml-auto">
            Phase {character.phase}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
