import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dest = join(__dirname, '..', 'public', 'github-events.json');
const username = 'Abdnour0';

async function main() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events?per_page=15`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    writeFileSync(dest, JSON.stringify(data, null, 2));
    console.log(`✓ Fetched ${data.length} GitHub events for ${username}`);
  } catch (err) {
    console.warn(`⚠ GitHub fetch failed (${err.message}) — using fallback`);
    writeFileSync(dest, JSON.stringify([]));
  }
}

main();
