"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { locales, localeNames, localeEmojis, useSiteData } from "@/lib/use-site-data";

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const { ui } = useSiteData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { href: "/", label: ui.nav.home, emoji: "🏠" },
    { href: "/timeline", label: ui.nav.timeline, emoji: "📖" },
    { href: "/characters", label: ui.nav.who, emoji: "🌟" },
    { href: "/reflections", label: ui.nav.values, emoji: "🌱" },
    { href: "/parents", label: ui.nav.parents, emoji: "👨‍👩‍👧‍👦" },
  ];

  const localePrefix = (l) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0])) {
      segments[0] = l;
    } else {
      segments.unshift(l);
    }
    return "/" + segments.join("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b-2 border-brown-dark/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-fredoka text-xl text-brown-dark hover:text-gold transition-colors flex items-center gap-2"
        >
          <span className="text-2xl">🕌</span>
          <span className="hidden sm:inline">{ui.nav.logo}</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const href = `/${locale}${link.href === "/" ? "" : link.href}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link.href}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-nunito font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gold text-white shadow-md"
                    : "text-brown hover:bg-amber-100"
                }`}
              >
                <span>{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-amber-200 text-sm font-nunito font-semibold text-brown hover:bg-amber-50 transition-all"
            >
              <span>{localeEmojis[locale]}</span>
              <span className="hidden sm:inline">{localeNames[locale]}</span>
              <motion.span
                animate={{ rotate: langOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs"
              >▼</motion.span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden min-w-[140px]"
                >
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={localePrefix(l)}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-nunito font-semibold transition-colors ${
                        l === locale
                          ? "bg-amber-50 text-gold"
                          : "text-brown hover:bg-amber-50"
                      }`}
                    >
                      <span>{localeEmojis[l]}</span>
                      <span>{localeNames[l]}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl p-2 hover:bg-amber-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-cream border-b-2 border-brown-dark/10"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => {
                const href = `/${locale}${link.href === "/" ? "" : link.href}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={link.href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-nunito font-semibold transition-all ${
                      isActive
                        ? "bg-gold text-white"
                        : "text-brown hover:bg-amber-100"
                    }`}
                  >
                    <span className="mr-2">{link.emoji}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
