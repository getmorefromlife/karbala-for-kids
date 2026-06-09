"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useSiteData } from "@/lib/use-site-data";

const stops = [
  { cityKey: "medina", emoji: "🕌", phase: 1, x: 40, y: 90 },
  { cityKey: "mecca", emoji: "🕋", phase: 2, x: 220, y: 75 },
  { cityKey: "karbala", emoji: "🏕️", phase: 3, x: 420, y: 95 },
];

export default function JourneyMap({ activePhase = 0 }) {
  const locale = useLocale();
  const { ui } = useSiteData();

  const caravanX = useTransform(
    useScroll().scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
    [40, 80, 160, 220, 320, 400, 440]
  );

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <svg viewBox="0 0 600 220" className="w-full h-auto">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="70" width="600" height="150" rx="20" fill="#F5E6C8" opacity="0.4" />

        <path
          d="M 40 90 Q 120 40 220 75 T 330 90 T 440 95"
          fill="none"
          stroke="#D4A574"
          strokeWidth="3"
          strokeDasharray="6 6"
          opacity="0.5"
        />

        <path
          d="M 40 90 Q 120 40 220 75 T 330 90 T 440 95"
          fill="none"
          stroke="#C62828"
          strokeWidth="2"
          strokeDasharray="4 8"
          opacity="0.2"
        />

        <motion.g style={{ translateX: caravanX }}>
          <text y="45" fontSize="22" textAnchor="middle">🐪</text>
        </motion.g>

        <text x="100" y="170" fontSize="16" opacity="0.12">🏜️</text>
        <text x="350" y="160" fontSize="14" opacity="0.12">🌵</text>
        <text x="200" y="185" fontSize="12" opacity="0.1">🌵</text>
        <text x="500" y="175" fontSize="16" opacity="0.12">🏜️</text>

        {[150, 280, 400, 100, 350, 480, 200, 320].map((x, i) => (
          <motion.text
            key={i}
            x={x}
            y={130 + (i % 3) * 15}
            fontSize="8"
            opacity="0.3"
            animate={{
              y: [130 + (i % 3) * 15, 125 + (i % 3) * 15, 130 + (i % 3) * 15],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          >
            ●
          </motion.text>
        ))}

        <motion.path
          d="M 440 115 Q 460 105 480 115"
          fill="none"
          stroke={activePhase >= 3 ? "#C62828" : "#42A5F5"}
          strokeWidth="6"
          strokeLinecap="round"
          opacity={activePhase >= 4 ? 0.3 : 0.6}
          animate={{ opacity: activePhase >= 4 ? [0.2, 0.4, 0.2] : [0.5, 0.7, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="460" y="100" fontSize="8" fill="#42A5F5" opacity="0.5" textAnchor="middle">
          {ui.map.euphrates}
        </text>

        {stops.map((stop) => {
          const isActive = activePhase === 0 || activePhase === stop.phase;
          const isPast = activePhase > stop.phase;
          const cityName = ui.map[stop.cityKey];

          return (
            <g key={stop.cityKey}>
              {isActive && (
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r="18"
                  fill="none"
                  stroke={isPast ? "#F9A825" : "#C62828"}
                  strokeWidth="2"
                  animate={{ r: [18, 24, 18], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <motion.circle
                cx={stop.x}
                cy={stop.y}
                r="14"
                fill="white"
                stroke={isPast ? "#F9A825" : isActive ? "#C62828" : "#D4A574"}
                strokeWidth={isActive ? 3 : 2}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              <text x={stop.x} y={stop.y + 1} textAnchor="middle" fontSize="14">
                {stop.emoji}
              </text>

              <text
                x={stop.x}
                y={stop.y + 40}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-fredoka)"
                fill={isPast ? "#F9A825" : isActive ? "#3E2723" : "#9E9E9E"}
                fontWeight={isActive ? "bold" : "normal"}
              >
                {cityName}
              </text>

              <text
                x={stop.x}
                y={stop.y + 53}
                textAnchor="middle"
                fontSize="8"
                fill={isActive ? "#5D4037" : "#BDBDBD"}
              >
                {ui.map.phase} {stop.phase}
              </text>

              <Link href={`/${locale}/timeline#phase-${stop.phase}`} passHref>
                <rect x={stop.x - 20} y={stop.y - 20} width="40" height="70" fill="transparent" style={{ cursor: "pointer" }} />
              </Link>
            </g>
          );
        })}

        {activePhase === 0 && <text x="560" y="25" fontSize="20">☀️</text>}
        {activePhase === 2 && (
          <motion.text x="560" y="25" fontSize="20" animate={{ rotate: [0, 15, 0] }} transition={{ duration: 3, repeat: Infinity }}>🌤️</motion.text>
        )}
        {activePhase === 3 && (
          <motion.text x="560" y="25" fontSize="20" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🌅</motion.text>
        )}
        {activePhase >= 4 && (
          <>
            <motion.text x="560" y="25" fontSize="20" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>🌙</motion.text>
            {[20, 60, 100, 140, 180, 260, 300, 340, 380].map((sx, i) => (
              <motion.text key={i} x={sx} y={20 + (i % 3) * 15} fontSize="8"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.5 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
              >⭐</motion.text>
            ))}
          </>
        )}

        {activePhase >= 2 && (
          <>
            <text x="30" y="200" fontSize="8" fill="#42A5F5" opacity="0.4">{ui.map.water}</text>
            <rect x="30" y="202" width="60" height="6" rx="3" fill="#E0E0E0" />
            <motion.rect
              x="30" y="202"
              width={activePhase >= 4 ? 0 : Math.max(60 - (activePhase - 2) * 30, 0)}
              height="6" rx="3" fill="#42A5F5"
              animate={{ width: Math.max(60 - (activePhase - 2) * 30, 0) }}
              transition={{ duration: 0.5 }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
