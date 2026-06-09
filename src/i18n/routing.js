import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "de"],
  defaultLocale: "en",
  localePrefix: "always",
});
