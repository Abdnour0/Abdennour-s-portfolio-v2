import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const destEvents = join(__dirname, '..', 'public', 'github-events.json');
const destChart = join(__dirname, '..', 'public', 'github-chart.svg');
const username = 'Abdnour0';

async function main() {
  // 1. Fetch GitHub events
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events?per_page=15`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    writeFileSync(destEvents, JSON.stringify(data, null, 2));
    console.log(`✓ Fetched ${data.length} GitHub events for ${username}`);
  } catch (err) {
    console.warn(`⚠ GitHub events fetch failed (${err.message}) — using fallback`);
  }

  // 2. Fetch GitHub contribution chart SVG
  try {
    const res = await fetch(`https://ghchart.rshah.org/c9a84c/${username}`);
    if (!res.ok) throw new Error(`Chart service error: ${res.status}`);
    const svgText = await res.text();
    writeFileSync(destChart, svgText);
    console.log(`✓ Fetched GitHub contribution chart for ${username}`);
  } catch (err) {
    console.warn(`⚠ GitHub chart fetch failed (${err.message})`);
  }
}

main();
