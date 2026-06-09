"use client";

import { motion } from "framer-motion";

export default function SceneIllustration({ scene, phaseColor }) {
  const baseClass = "relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden";

  const scenes = {
    medina: (
      <div className={`${baseClass} bg-gradient-to-b from-amber-200 to-amber-100`}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-300/50 rounded-t-3xl" />
        <div className="absolute bottom-4 left-1/4 w-12 h-16 bg-amber-400/40 rounded-lg transform -skew-x-6" />
        <div className="absolute bottom-4 left-1/3 w-12 h-16 bg-amber-400/40 rounded-lg transform skew-x-6" />
        <div className="absolute bottom-6 left-1/2 w-16 h-14 bg-amber-300/50 rounded-lg" />
        <div className="absolute top-6 left-6 text-5xl animate-float">🕌</div>
        <div className="absolute top-4 right-8 text-4xl animate-twinkle">⭐</div>
        <div className="absolute top-12 right-4 text-3xl animate-twinkle" style={{ animationDelay: "0.5s" }}>⭐</div>
        <div className="absolute bottom-20 left-1/3 text-4xl animate-float" style={{ animationDelay: "1s" }}>🌴</div>
        <div className="absolute bottom-20 right-1/4 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>🌴</div>
      </div>
    ),
    mecca: (
      <div className={`${baseClass} bg-gradient-to-b from-sky-200 to-sky-100`}>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-sky-300/40 rounded-t-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl animate-float">🕋</div>
        <div className="absolute top-6 left-8 text-5xl animate-float" style={{ animationDelay: "0.3s" }}>✉️</div>
        <div className="absolute top-8 right-10 text-4xl animate-float" style={{ animationDelay: "0.8s" }}>✉️</div>
        <div className="absolute top-16 right-4 text-4xl animate-float" style={{ animationDelay: "1.2s" }}>✉️</div>
        <div className="absolute bottom-10 left-1/4 text-3xl animate-twinkle">📝</div>
        <div className="absolute bottom-10 right-1/4 text-3xl animate-twinkle" style={{ animationDelay: "0.5s" }}>📝</div>
      </div>
    ),
    desert: (
      <div className={`${baseClass} bg-gradient-to-b from-orange-200 to-orange-100`}>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-orange-300/40" style={{ borderRadius: "50% 50% 0 0 / 30% 30% 0 0" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <div className="absolute bottom-0 left-0 w-full h-16 bg-amber-300/30" style={{ borderRadius: "40% 60% 0 0 / 20% 30% 0 0" }} />
        </div>
        <div className="absolute top-8 left-8 text-5xl animate-float">🏕️</div>
        <div className="absolute top-12 right-12 text-5xl animate-float" style={{ animationDelay: "1s" }}>🏕️</div>
        <div className="absolute top-4 right-4 text-5xl animate-pulse-glow">☀️</div>
        <div className="absolute bottom-16 left-1/3 text-4xl">💧</div>
        <div className="absolute bottom-16 right-1/4 text-4xl">💧</div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-6xl animate-float" style={{ animationDelay: "0.5s" }}>🐪</div>
      </div>
    ),
    ashura: (
      <div className={`${baseClass} bg-gradient-to-b from-red-200 to-red-100`}>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-red-300/40 rounded-t-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl animate-pulse-glow">🌟</div>
        <div className="absolute top-6 left-6 text-5xl">🏕️</div>
        <div className="absolute top-6 right-6 text-5xl">🏕️</div>
        <div className="absolute bottom-12 left-1/4 text-4xl">⚔️</div>
        <div className="absolute bottom-12 right-1/4 text-4xl">🛡️</div>
        <div className="absolute bottom-24 left-1/3 text-3xl animate-float" style={{ animationDelay: "0.3s" }}>🌹</div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-3xl animate-float" style={{ animationDelay: "0.5s" }}>🕊️</div>
        <div className="absolute top-3 left-1/3 text-2xl animate-twinkle">💔</div>
        <div className="absolute top-3 right-1/3 text-2xl animate-twinkle" style={{ animationDelay: "0.3s" }}>💔</div>
      </div>
    ),
    aftermath: (
      <div className={`${baseClass} bg-gradient-to-b from-indigo-200 to-indigo-100`}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-indigo-300/40" />
        <div className="absolute top-6 left-8 text-5xl animate-float">⛓️</div>
        <div className="absolute top-8 right-8 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🔥</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-float" style={{ animationDelay: "1s" }}>🤲</div>
        <div className="absolute bottom-16 left-1/3 text-4xl animate-twinkle">✨</div>
        <div className="absolute bottom-16 right-1/3 text-4xl animate-twinkle" style={{ animationDelay: "0.3s" }}>✨</div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-5xl animate-float" style={{ animationDelay: "0.8s" }}>🕯️</div>
        <div className="absolute top-4 left-1/3 text-3xl animate-twinkle" style={{ animationDelay: "0.5s" }}>🌙</div>
      </div>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {scenes[scene] || scenes.medina}
    </motion.div>
  );
}
