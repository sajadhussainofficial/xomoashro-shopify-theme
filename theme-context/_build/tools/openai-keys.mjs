// Loads OpenAI API keys from the repository's .env file (never printed, never committed).
// Any variable whose name ends in OPENAI_API_KEY is used, in file order.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

export function loadKeys() {
  const text = readFileSync(path.join(root, '.env'), 'utf8');
  const keys = [];
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*OPENAI_API_KEY)\s*=\s*["']?([^"'\s#]+)["']?/);
    if (match) keys.push({ name: match[1], value: match[2] });
  }
  if (!keys.length) throw new Error('No *OPENAI_API_KEY entries found in .env');
  return keys;
}

export const repoRoot = root;
