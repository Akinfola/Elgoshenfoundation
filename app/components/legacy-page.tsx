"use client";

import { useEffect } from "react";

const scripts = [
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
  "/lib/wow/wow.min.js",
  "/lib/easing/easing.min.js",
  "/lib/waypoints/waypoints.min.js",
  "/lib/owlcarousel/owl.carousel.min.js",
  "/lib/counterup/counterup.min.js",
  "/js/content-images.js",
  "/js/main.js",
];

function loadScript(source: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.async = false;
    script.dataset.legacyScript = "true";
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Could not load ${source}`));
    document.body.appendChild(script);
  });
}

export function LegacyPage({ html }: { html: string }) {
  useEffect(() => {
    let active = true;
    async function initialiseLegacyFeatures() {
      for (const source of scripts) {
        if (!active) return;
        try { await loadScript(source); } catch { /* Non-essential libraries can fail gracefully. */ }
      }
    }
    void initialiseLegacyFeatures();
    return () => {
      active = false;
      document.querySelectorAll<HTMLScriptElement>('script[data-legacy-script="true"]').forEach((script) => script.remove());
    };
  }, []);
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
