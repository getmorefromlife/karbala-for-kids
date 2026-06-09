"use client";

import { useEffect, useState } from "react";
import { useSiteData } from "@/lib/use-site-data";
import PhaseSection from "@/components/PhaseSection";
import TimelineProgress from "@/components/TimelineProgress";
import JourneyMap from "@/components/JourneyMap";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function TimelinePage() {
  const { phases, ui } = useSiteData();
  const locale = useLocale();
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const observers = [];
    const phaseElements = phases.map((p) => document.getElementById(`phase-${p.id}`));

    phaseElements.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivePhase(i + 1);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [phases]);

  return (
    <div className="relative pt-16">
      <TimelineProgress />

      <div className="text-center py-12 px-4 bg-gradient-to-b from-cream to-amber-50">
        <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl text-brown-dark mb-3">
          {ui.timeline.title}
        </h1>
        <p className="font-nunito text-lg text-brown/70 max-w-xl mx-auto">
          {ui.timeline.subtitle}
        </p>
      </div>

      <div className="sticky top-16 z-30 bg-cream/90 backdrop-blur-md py-4 px-4 border-b border-amber-100">
        <JourneyMap activePhase={activePhase} />
      </div>

      {phases.map((phase, index) => (
        <PhaseSection key={phase.id} phase={phase} index={index} locale={locale} />
      ))}

      <section className="py-24 px-4 bg-gradient-to-b from-indigo-100 to-cream text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6 animate-float">✨</div>
          <h2 className="font-fredoka text-4xl text-night mb-4">
            {ui.timeline.ending}
          </h2>
          <p className="font-nunito text-lg text-brown/70 leading-relaxed mb-8">
            {ui.timeline.endingDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/characters`}
              className="inline-flex items-center gap-2 font-fredoka text-lg px-6 py-3 rounded-full bg-gold text-white hover:shadow-lg hover:scale-105 transition-all"
            >
              {ui.timeline.btnHeroes}
            </Link>
            <Link
              href={`/${locale}/reflections`}
              className="inline-flex items-center gap-2 font-fredoka text-lg px-6 py-3 rounded-full bg-sky text-white hover:shadow-lg hover:scale-105 transition-all"
            >
              {ui.timeline.btnValues}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
