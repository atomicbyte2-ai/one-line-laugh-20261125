import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My GPS rerouted me past my ex's house, then said 'recalculating' like it was an accident.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (!outputDir.startsWith("/")) {
  throw new Error("MAKEFUN_OUTPUT_DIR must be an absolute path");
}

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${outPath} (${LINE.length} chars, single line, no trailing newline)`);
