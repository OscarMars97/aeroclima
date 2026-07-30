import { cp, mkdir, rm } from 'node:fs/promises';

const files = ['index.html', 'manifest.json', 'sw.js', 'config.js', 'config.example.js', 'icon-192.png', 'icon-512.png'];
const folders = ['assets', 'data', 'js'];

await rm('www', { recursive: true, force: true });
await mkdir('www', { recursive: true });
for (const file of files) await cp(file, `www/${file}`);
for (const folder of folders) await cp(folder, `www/${folder}`, { recursive: true });
