const axios = require("axios");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  await page.setViewport({
    width: 1540,    // Ideal width for normal desktop site
    height: 768,    // Enough for vertical scroll
    deviceScaleFactor: 1
  });

  page.on("request", async (req) => {
    if (req.url().includes("/api/front/placebet") && req.method() === "POST") {
      const postData = req.postData();
      console.log("🔥 Intercepted POST payload:", postData);
      try {
        await axios.post("http://localhost:4000/api/receive-bet", {
          data: postData
        });
        console.log("📨 Sent payload to backend successfully");
      } catch (err) {
        console.error("❌ Error sending payload to backend:", err.message);
      }
    }
    req.continue();
  });

  await page.goto("https://www.allpanelexch.com");

  console.log("✅ Site loaded. Login manually and place a bet.");
})();
