'use client';
import { useEffect } from "react";

export default function StartSession() {
  useEffect(() => {
    fetch("/api/start-puppeteer-session")
      .then(res => res.json())
      .then(data => {
        console.log("✅ Puppeteer started:", data.message);
      })
      .catch(err => {
        console.error("❌ Failed to start Puppeteer:", err);
      });
  }, []);

  return <div>Launching site session... please wait</div>;
}
