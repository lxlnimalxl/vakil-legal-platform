const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_DIR = path.join(__dirname, 'screenshots');
const PORT = 4198;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function startServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
    if (filePath.endsWith(path.sep) || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Hero Overview (1440x980)
    console.log('Capturing 01-desktop-hero-overview.png...');
    await page.setViewport({ width: 1440, height: 980, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-desktop-hero-overview.png') });

    // 2. Services Grid
    console.log('Capturing 02-services-grid.png...');
    await page.evaluate(() => {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-services-grid.png') });

    // 3. Court Fee Calculator
    console.log('Capturing 03-court-fee-calculator.png...');
    await page.evaluate(() => {
      const el = document.getElementById('calculator');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-court-fee-calculator.png') });

    // 4. FAQ & Testimonials
    console.log('Capturing 04-faq-and-testimonials.png...');
    await page.evaluate(() => {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-faq-and-testimonials.png') });

    // 5. Consultation Booking Modal
    console.log('Capturing 05-consultation-booking-modal.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const bookBtn = btns.find(b => b.textContent.includes('رزرو نوبت مشاوره'));
      if (bookBtn) bookBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-consultation-booking-modal.png') });

    // 6. Mobile Responsive View (420x920)
    console.log('Capturing 06-mobile-responsive-view.png...');
    await page.setViewport({ width: 420, height: 920, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06-mobile-responsive-view.png') });

    console.log('All 6 screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
