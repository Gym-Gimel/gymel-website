import { readFile } from "node:fs/promises";
import path from "node:path";
import { csvConfig } from "@/lib/config";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");

export type CsvKey =
  | "courses"
  | "competitions"
  | "events"
  | "volleyballMen"
  | "volleyballWomen";

const localFiles: Record<CsvKey, string> = {
  courses: "courses.csv",
  competitions: "competitions.csv",
  events: "events.csv",
  volleyballMen: "volleyball-men.csv",
  volleyballWomen: "volleyball-women.csv"
};

const sourceUrls: Record<CsvKey, string | undefined> = {
  courses: csvConfig.sources.courses,
  competitions: csvConfig.sources.competitions,
  events: csvConfig.sources.events,
  volleyballMen: csvConfig.sources.volleyballMen,
  volleyballWomen: csvConfig.sources.volleyballWomen
};

export async function readLocalCsv(key: CsvKey) {
  return readFile(path.join(DATA_DIR, localFiles[key]), "utf8");
}

export async function readCsvWithFallback(key: CsvKey) {
  const url = sourceUrls[key];
  const localSource = `data/${localFiles[key]}`;

  if (!url || !csvConfig.useRemoteSources) {
    return {
      source: localSource,
      text: await readLocalCsv(key),
      remote: false
    };
  }

  try {
    const response = await fetch(url, { next: { revalidate: csvConfig.revalidateSeconds } });
    if (!response.ok) throw new Error(`Réponse HTTP ${response.status}`);
    return {
      source: url,
      text: await response.text(),
      remote: true
    };
  } catch (error) {
    console.warn(`[csv] Impossible de charger ${url}. Fallback local data/${localFiles[key]}.`, error);
    return {
      source: localSource,
      text: await readLocalCsv(key),
      remote: false
    };
  }
}
