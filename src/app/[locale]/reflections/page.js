"use client";

import { motion } from "framer-motion";
import { useSiteData } from "@/lib/use-site-data";
import ValueCard from "@/components/ValueCard";
import CivicValueCard from "@/components/CivicValueCard";

export default function ReflectionsPage() {
  const { reflections, civicValues, ui } = useSiteData();

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-gradient-to-b from-cream to-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl text-brown-dark mb-3">
            {ui.reflections.title}
          </h1>
          <p className="font-nunito text-lg text-brown/70 max-w-xl mx-auto">
            {ui.reflections.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reflections.map((item, index) => (
            <ValueCard key={index} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center py-12 px-6 rounded-3xl bg-night/5"
        >
          <h2 className="font-fredoka text-3xl text-brown-dark mb-4">
            {ui.reflections.starGarden}
          </h2>
          <p className="font-nunito text-brown/70 mb-6">
            {ui.reflections.starDesc}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {reflections.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-4xl animate-twinkle"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {item.emoji}
              </motion.span>
            ))}
          </div>
          <p className="font-nunito text-sm text-brown/50 mt-6">
            {ui.reflections.share}
          </p>
        </motion.div>

        {civicValues && civicValues.length > 0 && (
          <>
            <div className="mt-20 mb-4 border-t border-amber-200 pt-12" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl text-brown-dark mb-3">
                {ui.civicValues.title}
              </h1>
              <p className="font-nunito text-lg text-brown/70 max-w-2xl mx-auto">
                {ui.civicValues.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {civicValues.map((item, index) => (
                <CivicValueCard key={item.id} item={item} index={index} ui={ui} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
