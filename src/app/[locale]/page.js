"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import JourneyMap from "@/components/JourneyMap";
import { useSiteData } from "@/lib/use-site-data";

export default function HomePage() {
  const locale = useLocale();
  const { ui } = useSiteData();

  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-gradient-to-b from-cream via-amber-50 to-cream relative overflow-hidden">
        <div className="absolute top-20 start-10 text-7xl opacity-10 animate-float">🕌</div>
        <div className="absolute top-40 end-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🌙</div>
        <div className="absolute bottom-40 start-20 text-5xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>⭐</div>
        <div className="absolute bottom-20 end-20 text-6xl opacity-10 animate-float" style={{ animationDelay: "0.5s" }}>🏜️</div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-3xl mx-auto"
        >
          <div className="text-7xl mb-6 animate-float">🕌</div>
          <h1 className="font-fredoka text-5xl sm:text-6xl md:text-7xl text-brown-dark mb-4 leading-tight">
            {ui.home.title1}
          </h1>
          <p className="font-nunito text-lg sm:text-xl text-brown/70 mb-8 max-w-lg mx-auto leading-relaxed">
            {ui.home.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/timeline`}
              className="inline-flex items-center gap-2 font-fredoka text-lg px-8 py-4 rounded-full bg-gold text-white hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {ui.home.btnTimeline}
            </Link>
            <Link
              href={`/${locale}/characters`}
              className="inline-flex items-center gap-2 font-fredoka text-lg px-8 py-4 rounded-full bg-white text-brown-dark hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-amber-200 shadow-lg"
            >
              {ui.home.btnCharacters}
            </Link>
          </div>

          <div className="mt-12 animate-float text-3xl">👇</div>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-cream to-amber-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-3xl sm:text-4xl text-brown-dark mb-4">
              {ui.home.journeyTitle}
            </h2>
            <p className="font-nunito text-lg text-brown/70 max-w-xl mx-auto">
              {ui.home.journeyDesc}
            </p>
          </motion.div>

          <JourneyMap />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {ui.home.phases.map((item, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center card-shadow"
              >
                <span className="text-3xl">{[..."📍✉️🏕️⚔️🤲"][i]}</span>
                <h3 className="font-fredoka text-base text-brown-dark mt-1">{item.title}</h3>
                <p className="font-nunito text-sm text-brown/60">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-cream">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fredoka text-3xl sm:text-4xl text-brown-dark text-center mb-10"
          >
            {ui.home.explore}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { ...ui.home.cards[0], emoji: "📖", href: "/timeline", color: "bg-gold" },
              { ...ui.home.cards[1], emoji: "🌟", href: "/characters", color: "bg-sky" },
              { ...ui.home.cards[2], emoji: "🌱", href: "/reflections", color: "bg-sunset" },
            ].map((item) => (
              <Link
                key={item.title}
                href={`/${locale}${item.href}`}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <h3 className="font-fredoka text-xl text-brown-dark mb-2">{item.title}</h3>
                <p className="font-nunito text-sm text-brown/70">{item.desc}</p>
                <div className={`mt-4 h-1 rounded-full ${item.color} w-0 group-hover:w-full transition-all duration-300`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center bg-brown-dark text-cream/70">
        <div className="max-w-xl mx-auto">
          <p className="font-fredoka text-lg text-cream mb-2">{ui.home.footer}</p>
          <p className="font-nunito text-sm text-cream/50">{ui.home.footerSub}</p>
        </div>
      </footer>
    </div>
  );
}
