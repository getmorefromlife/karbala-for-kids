import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Fredoka, Nunito } from "next/font/google";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import VisualEditor from "@/components/VisualEditor";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const isRtl = locale === "ur";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${fredoka.variable} ${nunito.variable} ${notoNastaliq.variable} h-full`}
    >
      <body className={`min-h-screen flex flex-col ${isRtl ? "font-nastaliq" : ""}`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-1">{children}</main>
          <VisualEditor />
          <footer className="bg-gradient-to-r from-gold via-amber-400 to-gold py-6 px-4 text-center border-t-4 border-brown-dark/10">
            <div className="max-w-3xl mx-auto">
              <p className="font-fredoka text-lg sm:text-xl text-white drop-shadow-md">
                Community Service Initiative
              </p>
              <p className="font-fredoka text-base sm:text-lg text-white/90 mt-1">
                Created by Maulana Syed Imon Rizvi
              </p>
              <p className="font-fredoka text-base sm:text-lg text-white/80 mt-1">
                2026
              </p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
