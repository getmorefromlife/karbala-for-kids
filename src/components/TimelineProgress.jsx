"use client";

import { motion } from "framer-motion";
import { useSiteData } from "@/lib/use-site-data";

export default function TimelineProgress() {
  const { phases } = useSiteData();
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-3 py-4 px-2 bg-white/80 backdrop-blur-md rounded-2xl card-shadow">
        {phases.map((phase, i) => (
          <a
            key={phase.id}
            href={`#phase-${phase.id}`}
            className="group relative flex items-center gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:shadow-lg"
              style={{
                borderColor: phase.color,
                backgroundColor: "white",
              }}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-nunito text-xs font-bold px-2 py-1 rounded-lg bg-white shadow-md"
              style={{ color: phase.color }}
            >
              Phase {phase.id}: {phase.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
