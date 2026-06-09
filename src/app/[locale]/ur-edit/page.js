"use client";

import { useState, useEffect } from "react";

const files = ["ui", "phases", "characters", "reflections", "parents"];

const fileEmojis = {
  ui: "🔤",
  phases: "📖",
  characters: "🌟",
  reflections: "🌱",
  parents: "👨‍👩‍👧‍👦",
};

export default function UrduEditPage() {
  const [activeFile, setActiveFile] = useState("ui");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadFile(activeFile);
  }, [activeFile]);

  const loadFile = async (file) => {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`/api/load-urdu?file=${file}`);
      const data = await res.json();
      setContent(data.content);
    } catch (e) {
      setContent("// Error loading file");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      const res = await fetch("/api/save-urdu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: activeFile, content }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Saved! Refresh the Urdu page to see changes.");
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (e) {
      setStatus("❌ Error: " + e.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-16" dir="ltr">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-fredoka text-3xl text-brown-dark mb-2">✏️ Urdu Text Editor</h1>
        <p className="font-nunito text-brown/70 mb-6">
          Edit Urdu translations below. After saving, visit <a href="/ur" className="text-gold underline">/ur</a> to see changes.
        </p>

        {/* File tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {files.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFile(f)}
              className={`font-fredoka px-4 py-2 rounded-full text-sm transition-all ${
                activeFile === f
                  ? "bg-gold text-white shadow-md"
                  : "bg-white text-brown border border-amber-200 hover:bg-amber-50"
              }`}
            >
              {fileEmojis[f]} {f}.js
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl card-shadow overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border-b border-amber-100">
            <span className="font-fredoka text-sm text-brown-dark">
              src/data/ur/{activeFile}.js
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => loadFile(activeFile)}
                className="px-3 py-1.5 text-sm font-nunito font-semibold rounded-full bg-white border border-amber-200 text-brown hover:bg-amber-100 transition-all"
              >
                ↩️ Reset
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 text-sm font-fredoka rounded-full bg-gold text-white hover:shadow-md transition-all"
              >
                💾 Save
              </button>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] font-mono text-sm p-4 bg-white text-brown-dark resize-y focus:outline-none"
            dir="ltr"
          />
        </div>

        {status && (
          <div className="mt-4 p-4 rounded-xl bg-white card-shadow font-nunito text-sm text-brown-dark">
            {status}
            {status.includes("✅") && (
              <div className="mt-2 flex gap-3">
                <a href="/ur" className="text-gold font-bold underline">🌐 View Urdu site</a>
                <a href={`/ur/${activeFile === 'ui' ? '' : activeFile}`} className="text-sky font-bold underline">👁️ Preview page</a>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="font-nunito text-sm text-brown/70">
            💡 <strong>Tip:</strong> Be careful not to break the JavaScript syntax. 
            Keep the <code className="bg-amber-100 px-1 rounded">export const ... =</code> line, 
            keep all commas, brackets, and quotes intact. Just change the text inside the quotes.
          </p>
        </div>
      </div>
    </div>
  );
}
