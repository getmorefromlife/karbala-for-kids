"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSiteData } from "@/lib/use-site-data";
import CharacterCard from "@/components/CharacterCard";

export default function CharactersPage() {
  const { characters, ui } = useSiteData();
  const [filter, setFilter] = useState("all");

  const f = ui.characters.filters;

  const filterOptions = [
    { label: f.all, value: "all", emoji: "📋" },
    { label: f.heroes, value: "heroes", emoji: "🌟" },
    { label: f.phase1, value: "1", emoji: "📍" },
    { label: f.phase2, value: "2", emoji: "✉️" },
    { label: f.phase3, value: "3", emoji: "🏕️" },
    { label: f.phase4, value: "4", emoji: "⚔️" },
    { label: f.phase5, value: "5", emoji: "🤲" },
    { label: f.others, value: "others", emoji: "⚠️" },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return characters;
    if (filter === "heroes") return characters.filter((c) => !c.isAntagonist);
    if (filter === "others") return characters.filter((c) => c.isAntagonist);
    return characters.filter((c) => c.phase === parseInt(filter));
  }, [filter, characters]);

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-gradient-to-b from-cream to-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl text-brown-dark mb-3">
            {ui.characters.title}
          </h1>
          <p className="font-nunito text-lg text-brown/70 max-w-xl mx-auto">
            {ui.characters.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`font-fredoka text-sm px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                filter === f.value
                  ? "bg-gold text-white shadow-md scale-105"
                  : "bg-white text-brown hover:bg-amber-100 shadow-sm"
              }`}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((character) => (
            <CharacterCard key={character.name} character={character} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-fredoka text-2xl text-brown/40">
              {ui.characters.empty}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
