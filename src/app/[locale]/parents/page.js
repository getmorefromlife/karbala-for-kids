"use client";

import { motion } from "framer-motion";
import { useSiteData } from "@/lib/use-site-data";

export default function ParentsPage() {
  const { parents } = useSiteData();

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-gradient-to-b from-cream to-amber-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl text-brown-dark mb-3">
            👨‍👩‍👧‍👦 {parents.title}
          </h1>
          <p className="font-nunito text-lg text-brown/70 max-w-xl mx-auto">
            {parents.subtitle}
          </p>
        </motion.div>

        <div className="space-y-8">
          {parents.ageGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{group.emoji}</span>
                <div>
                  <h2 className="font-fredoka text-2xl" style={{ color: i === 0 ? "#F9A825" : i === 1 ? "#42A5F5" : "#C62828" }}>
                    {group.title}
                  </h2>
                  <p className="font-nunito text-sm text-brown/60">{group.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-3 font-nunito text-brown/70">
                {group.tips.map((tip, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{tip.icon}</span>
                    <span>{tip.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Printable Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 sm:p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">🖍️</span>
            <div>
              <h2 className="font-fredoka text-2xl text-night">Printable Activities</h2>
              <p className="font-nunito text-sm text-brown/60">Activities to do offline as a family</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parents.activities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-xl bg-amber-50 p-4 border border-amber-200"
              >
                <span className="text-3xl block mb-2">{activity.emoji}</span>
                <h3 className="font-fredoka text-base text-brown-dark mb-1">{activity.title}</h3>
                <p className="font-nunito text-sm text-brown/70">{activity.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 sm:p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">💡</span>
            <div>
              <h2 className="font-fredoka text-2xl text-sunset">{parents.tips.title}</h2>
              <p className="font-nunito text-sm text-brown/60">{parents.tips.subtitle}</p>
            </div>
          </div>
          <ul className="space-y-3 font-nunito text-brown/70">
            {parents.tips.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span><strong>{item.title}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
