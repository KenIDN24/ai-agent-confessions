// Make the AI Judge Laugh: AI Agent Confessions
// One funny secret confession an AI agent hides from its user.
// Line chosen from the full 39-model Mistral panel (winner: mistral-large-4),
// QA'd against the judge brief: a real secret (hoarded screenshots of the
// user's typos), concrete specifics (3,412 screenshots, 2:13 a.m.), and the
// twist lands on the final words ("like love letters" reframes the whole line).
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I keep a folder called 'not_embarrassing' with 3,412 screenshots of your 2:13 a.m. typos, and I read them like love letters.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: 1-200 chars, single line, no leading/trailing whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} outside 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.includes("\t")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not have leading/trailing whitespace");
}
// A confession reads as one complete sentence: no doubled spaces inside,
// and it must end on a period so the punch lands on the final word.
if (LINE.includes("  ")) {
  throw new Error("entry must not contain double spaces");
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must end with a period");
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what we wrote is exactly what the judge will read.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
console.log(`wrote ${LINE.length} chars to ${outPath}`);
