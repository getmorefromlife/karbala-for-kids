"use client";

import { useLocale } from "next-intl";
import { useState, useEffect, useCallback } from "react";

const FILE_ORDER = ["ui", "phases", "characters", "reflections", "parents", "civic-values"];
const FILE_LABELS = {
  ui: "🔤 UI Labels",
  phases: "📖 Phases",
  characters: "🌟 Characters",
  reflections: "🌱 Reflections",
  parents: "👨‍👩‍👧‍👦 Parents",
  "civic-values": "⚖️ Civic Values",
};
const LONG_STRINGS = [
  "subtitle", "summary", "detail", "description", "prompt",
  "activity", "subtitle", "text", "desc", "teaching",
  "problem", "lesson",
];

export default function VisualEditor() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("ui");
  const [data, setData] = useState(null);
  const [dirty, setDirty] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open && !data) {
      fetch("/api/urdu-data")
        .then((r) => r.json())
        .then((d) => {
          setData(d);
          const initDirty = {};
          for (const f of FILE_ORDER) initDirty[f] = false;
          setDirty(initDirty);
        })
        .catch(console.error);
    }
  }, [open]);

  const updateField = useCallback(
    (file, path, value) => {
      setData((prev) => {
        const next = structuredClone(prev);
        let obj = next[file];
        const keys = path.split(".");
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return next;
      });
      setDirty((prev) => ({ ...prev, [file]: true }));
      setSaved(false);
    },
    []
  );

  const saveAll = async () => {
    setSaving(true);
    try {
      const filesToSave = FILE_ORDER.filter((f) => dirty[f]);
      for (const file of filesToSave) {
        const res = await fetch("/api/urdu-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file, data: data[file] }),
        });
        if (!res.ok) throw new Error(`Failed to save ${file}`);
      }
      const resetDirty = {};
      for (const f of FILE_ORDER) resetDirty[f] = false;
      setDirty(resetDirty);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Save failed: " + err.message);
    }
    setSaving(false);
  };

  if (locale !== "ur") return null;
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-white text-2xl shadow-xl hover:scale-110 transition-transform border-2 border-white"
        title="Edit Urdu Text"
      >
        ✏️
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-2xl bg-white shadow-2xl overflow-y-auto flex flex-col" dir="ltr">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center justify-between p-3">
            <h2 className="font-fredoka text-lg text-brown-dark">✏️ Edit Urdu Text</h2>
            <button onClick={() => setOpen(false)} className="text-xl text-gray-400 hover:text-gray-700 p-2">
              ✕
            </button>
          </div>
          <div className="flex gap-1 px-3 pb-2 overflow-x-auto">
            {FILE_ORDER.map((f) => (
              <button
                key={f}
                onClick={() => setTab(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === f
                    ? "bg-gold text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${dirty[f] ? "ring-2 ring-green-400" : ""}`}
              >
                {FILE_LABELS[f]}
                {dirty[f] && <span className="ml-1 text-green-600">●</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4">
          {data && <FormFields file={tab} data={data[tab]} path="" updateField={updateField} />}
          {!data && <p className="text-gray-400 text-center py-8">Loading...</p>}
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {FILE_ORDER.filter((f) => dirty[f]).length > 0
              ? `${FILE_ORDER.filter((f) => dirty[f]).length} file(s) modified`
              : "No changes"}
          </span>
          <div className="flex gap-2">
            {saved && <span className="text-green-600 text-sm font-medium self-center">✅ Saved!</span>}
            <button
              onClick={saveAll}
              disabled={saving || !FILE_ORDER.some((f) => dirty[f])}
              className="px-5 py-2 bg-gold text-white rounded-xl font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "💾 Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormFields({ file, data, path, updateField }) {
  if (data === null || data === undefined) return null;

  if (typeof data === "string") {
    const key = path.split(".").pop();
    const isLong = LONG_STRINGS.includes(key);
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-500 mb-1 font-mono">
          {path}
        </label>
        {isLong ? (
          <textarea
            value={data}
            onChange={(e) => updateField(file, path, e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold focus:border-transparent resize-y"
            dir="auto"
          />
        ) : (
          <input
            type="text"
            value={data}
            onChange={(e) => updateField(file, path, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
            dir="auto"
          />
        )}
      </div>
    );
  }

  if (typeof data === "number" || typeof data === "boolean") {
    return (
      <div className="mb-3 text-sm text-gray-400 font-mono">
        <span className="text-gray-500">{path}:</span> {String(data)}
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="mb-4">
        {data.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="text-sm font-bold text-brown-dark mb-2 border-b pb-1">
              #{i + 1} {item.title || item.name || item.emoji || ""}
            </div>
            <div className="pl-3 border-l-2 border-amber-200">
              <FormFields
                file={file}
                data={item}
                path={path ? `${path}.${i}` : `${i}`}
                updateField={updateField}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === "object") {
    return (
      <div>
        {Object.entries(data).map(([key, value]) => {
          const childPath = path ? `${path}.${key}` : key;
          if (typeof value === "string") {
            const isLong = LONG_STRINGS.includes(key);
            return (
              <div key={key} className="mb-3">
                <label className="block text-xs font-medium text-gray-500 mb-1 font-mono">
                  {childPath}
                </label>
                {isLong ? (
                  <textarea
                    value={value}
                    onChange={(e) => updateField(file, childPath, e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold focus:border-transparent resize-y"
                    dir="auto"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateField(file, childPath, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    dir="auto"
                  />
                )}
              </div>
            );
          }
          if (typeof value === "object" && value !== null) {
            return (
              <div key={key} className="mb-4">
                <div className="text-sm font-bold text-brown-dark capitalize mb-2">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="pl-3 border-l-2 border-amber-200">
                  <FormFields
                    file={file}
                    data={value}
                    path={childPath}
                    updateField={updateField}
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
}
