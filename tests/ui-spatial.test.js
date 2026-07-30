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

assert.match(css, /backdrop-filter:blur\(48px\) saturate\(180%\)/);
assert.match(css, /linear-gradient\(90deg,#f97316,#f59e0b\)/);
assert.match(css, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /rgba\(16,185,129,.05\)/);

assert.match(serviceWorker, /aero-clima-v11-spatial-complete/);
assert.match(serviceWorker, /\.\/css\/spatial-complete\.css\?v=11/);
JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

console.log('Spatial UI structure and inline JavaScript test passed.');
