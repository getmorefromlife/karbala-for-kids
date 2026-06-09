"use client";

import { motion } from "framer-motion";
import SceneIllustration from "./SceneIllustration";
import EventCard from "./EventCard";
import { useSiteData } from "@/lib/use-site-data";

export default function PhaseSection({ phase, index }) {
  const { ui } = useSiteData();
  const isEven = index % 2 === 0;

  return (
    <section
      id={`phase-${phase.id}`}
      className={`relative min-h-screen py-24 px-4 ${phase.bgClass} overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🌟</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🌟</div>
        <div className="absolute top-1/3 right-20 text-4xl opacity-5 animate-twinkle">🌙</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span
              className="text-white font-fredoka text-sm px-4 py-1.5 rounded-full"
              style={{ backgroundColor: phase.color }}
            >
              {ui.phase.badge.replace("{n}", phase.id)}
            </span>
            <span className="font-nunito text-sm text-brown/60 font-semibold">
              {phase.period}
            </span>
          </div>
          <h2
            className="font-fredoka text-4xl sm:text-5xl md:text-6xl mb-2"
            style={{ color: phase.color }}
          >
            {phase.title}
          </h2>
          <p className="font-fredoka text-xl sm:text-2xl text-brown-dark/70">
            {phase.subtitle}
          </p>
          <div className="max-w-2xl mx-auto mt-4">
            <p className="font-nunito text-base sm:text-lg text-brown/80 leading-relaxed">
              {phase.summary}
            </p>
          </div>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={isEven ? "lg:order-1" : "lg:order-2"}
          >
            <SceneIllustration scene={phase.scene} phaseColor={phase.color} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-brown/10" />
              <span
                className="font-fredoka text-sm px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: phase.color }}
              >
                {ui.phase.keyEvents}
              </span>
              <div className="h-px flex-1 bg-brown/10" />
            </div>

            {phase.events.map((event, i) => (
              <EventCard key={i} event={event} phaseColor={phase.color} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
