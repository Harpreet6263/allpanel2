// import { spawn } from "child_process";

// export default function handler(req, res) {
//   const child = spawn("npm.cmd", ["run", "watch-api"]); // 👈 note 'npm.cmd' on Windows

//   console.log("🚀 Puppeteer script started");

//   child.stdout.on("data", (data) => {
//     console.log("📤 [watch-api stdout]:", data.toString());
//   });

//   child.stderr.on("data", (data) => {
//     console.error("❗ [watch-api stderr]:", data.toString());
//   });

//   child.on("close", (code) => {
//     console.log(`❎ Puppeteer script exited with code ${code}`);
//   });

//   res.status(200).json({ message: "Puppeteer launched in background" });
// }
// pages/api/start-puppeteer-session.js
export default async function handler(req, res) {
  try {
    const response = await fetch("https://puppeteer-api-monitor-production.up.railway.app"); // 👈 your Puppeteer Railway URL

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.text(); // Puppeteer might not return JSON
    console.log("✅ Triggered Puppeteer remotely:", body);

    res.status(200).json({ message: "Triggered Puppeteer on Railway" });
  } catch (err) {
    console.error("❌ Error triggering Puppeteer on Railway:", err.message);
    res.status(500).json({ error: "Failed to trigger Puppeteer on Railway" });
  }
}
