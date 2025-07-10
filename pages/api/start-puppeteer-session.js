import { spawn } from "child_process";

export default function handler(req, res) {
  const child = spawn("npm.cmd", ["run", "watch-api"]); // 👈 note 'npm.cmd' on Windows

  console.log("🚀 Puppeteer script started");

  child.stdout.on("data", (data) => {
    console.log("📤 [watch-api stdout]:", data.toString());
  });

  child.stderr.on("data", (data) => {
    console.error("❗ [watch-api stderr]:", data.toString());
  });

  child.on("close", (code) => {
    console.log(`❎ Puppeteer script exited with code ${code}`);
  });

  res.status(200).json({ message: "Puppeteer launched in background" });
}
