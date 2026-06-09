# 🕌 Karbala for Kids

**A Community Service Initiative** — inspiring the next generation with the timeless values of Karbala: **truth, justice, bravery, and piety**.

> Created by Maulana Syed Imon Rizvi · 2026

---

## 🎯 Mission

To create awareness about the eternal values of **truth (Sidq)**, **justice (Adl)**, **bravery (Shuja'at)**, and **piety (Taqwa)** among children and the new generation through the inspiring story of Imam Husayn (a.s.) and the events of Karbala.

## 🌐 Live Site

**[karbala-timeline.vercel.app](https://karbala-timeline.vercel.app)**

Available in **English**, **اردو (Urdu)**, and **Deutsch (German)**.

## ✨ Features

- **📖 Scrollable Timeline** — Step through the story of Karbala from Medina to Ashura
- **🌟 Character Spotlights** — Meet the heroes of Karbala with filterable profiles
- **🌱 Values Garden** — Interactive value reflections with thought prompts and activities
- **⚖️ Civic & Moral Values** — Practical lessons for children on how to embody the spirit of Karbala in daily life
- **🗺️ Animated Journey Map** — Scroll-linked caravan animation across the desert
- **👨‍👩‍👧‍👦 Parents' Corner** — Guidance for families on teaching Karbala to children
- **🌍 Multilingual** — English, Urdu (with Nastaliq font & RTL), and German

## 🛠️ Built With

- **Next.js 16** — App Router with i18n
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Scroll-triggered animations
- **next-intl** — Internationalization (EN/UR/DE)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/          # Locale-routed pages (en, ur, de)
│       ├── page.js         # Landing page
│       ├── timeline/       # Scrollytelling timeline
│       ├── characters/     # Character grid
│       ├── reflections/    # Values garden
│       └── parents/        # Parent guide
├── components/             # Reusable UI components
├── data/                   # All content per locale
│   ├── en/                 # English content
│   ├── ur/                 # Urdu content (editable via ✏️ editor)
│   └── de/                 # German content
├── lib/                    # Hooks & utilities
└── i18n/                   # Internationalization config
```

## ✏️ Editing Content

On any `/ur` page, click the **✏️** button (bottom-right) to open the visual editor for Urdu content. Changes save directly to `src/data/ur/*.js`.

## 📜 License

This is a free community service project. All content may be used for educational and non-commercial purposes with attribution.
