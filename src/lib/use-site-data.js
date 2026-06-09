"use client";

import { useLocale } from "next-intl";
import { phases as enPhases } from "@/data/en/phases";
import { characters as enCharacters } from "@/data/en/characters";
import { reflections as enReflections } from "@/data/en/reflections";
import { parents as enParents } from "@/data/en/parents";
import { ui as enUi } from "@/data/en/ui";
import { civicValues as enCivic } from "@/data/en/civic-values";
import { phases as dePhases } from "@/data/de/phases";
import { characters as deCharacters } from "@/data/de/characters";
import { reflections as deReflections } from "@/data/de/reflections";
import { parents as deParents } from "@/data/de/parents";
import { ui as deUi } from "@/data/de/ui";
import { civicValues as deCivic } from "@/data/de/civic-values";
import { phases as urPhases } from "@/data/ur/phases";
import { characters as urCharacters } from "@/data/ur/characters";
import { reflections as urReflections } from "@/data/ur/reflections";
import { parents as urParents } from "@/data/ur/parents";
import { ui as urUi } from "@/data/ur/ui";
import { civicValues as urCivic } from "@/data/ur/civic-values";

const dataMap = {
  en: { phases: enPhases, characters: enCharacters, reflections: enReflections, civicValues: enCivic, parents: enParents, ui: enUi },
  de: { phases: dePhases, characters: deCharacters, reflections: deReflections, civicValues: deCivic, parents: deParents, ui: deUi },
  ur: { phases: urPhases, characters: urCharacters, reflections: urReflections, civicValues: urCivic, parents: urParents, ui: urUi },
};

export function useSiteData() {
  const locale = useLocale();
  const data = dataMap[locale] || dataMap.en;
  return data;
}

export function getSiteData(locale) {
  return dataMap[locale] || dataMap.en;
}

export const locales = ["en", "ur", "de"];
export const localeNames = {
  en: "English",
  ur: "اردو",
  de: "Deutsch",
};
export const localeEmojis = {
  en: "🇬🇧",
  ur: "🇵🇰",
  de: "🇩🇪",
};
