const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/spatial-complete.css', 'utf8');
const serviceWorker = fs.readFileSync('sw.js', 'utf8');

const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .filter((source) => source.trim());
for (const source of inlineScripts) new Function(source);

assert.match(html, /class="aura-orb aura-orb--sun"/);
assert.match(html, /class="glass card hero-card--weather"/);
assert.match(html, /class="models-grid conditions-grid"/);
assert.match(html, /class="alert-empty alert-empty--clear"/);
assert.match(html, /plugins:\[neonGlowPlugin\]/);
assert.match(html, /plugins:\[modelGlowPlugin\]/);
assert.match(html, /id="greeting-title"/);
assert.match(html, /function updateGreeting\(\)/);
assert.match(html, /function greetingForMinutes\(minutes\)/);
assert.match(html, /minutes >= 360 && minutes <= 720/);
assert.match(html, /minutes > 720 && minutes <= 1200/);
assert.match(html, /data-forecast-toggle/);
assert.match(html, /class="day-metrics-grid"/);
assert.match(html, /viewBox="-10 -10 120 120"/);
assert.doesNotMatch(html, /data-tab="ajustes"/);
assert.doesNotMatch(html, /id="tab-ajustes"/);

assert.match(css, /backdrop-filter:blur\(48px\) saturate\(180%\)/);
assert.match(css, /linear-gradient\(90deg,#f97316,#f59e0b\)/);
assert.match(css, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /rgba\(16,185,129,.05\)/);
assert.match(css, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
assert.match(css, /\.day-hourly-carousel/);
assert.match(css, /\.gauge-wrap svg\{\s*width:100%;\s*height:100%;\s*overflow:visible!important/);

assert.match(serviceWorker, /aero-clima-v15-forecast-accordion/);
assert.match(serviceWorker, /\.\/css\/spatial-complete\.css\?v=15/);
assert.match(css, /background:rgba\(255,255,255,.40\)!important/);
assert.match(css, /background:rgba\(255,255,255,.04\)!important/);
assert.match(css, /background:#ff5500/);
assert.match(css, /background:#9000ff/);
JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

console.log('Spatial UI structure and inline JavaScript test passed.');
