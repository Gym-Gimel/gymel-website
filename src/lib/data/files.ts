import { readFile } from "node:fs/promises";
import path from "node:path";
import { csvConfig } from "@/lib/config";

const ROOT = process.cwd();

export type CsvKey = "courses" | "competitions" | "volleyballMen" | "volleyballWomen";

const localFiles: Record<CsvKey, string> = {
  courses: "data/courses.csv",
  competitions: "data/competitions.csv",
  volleyballMen: "data/volleyball-men.csv",
  volleyballWomen: "data/volleyball-women.csv"
};

const sourceUrls: Record<CsvKey, string | undefined> = {
  courses: csvConfig.sources.courses,
  competitions: csvConfig.sources.competitions,
  volleyballMen: csvConfig.sources.volleyballMen,
  volleyballWomen: csvConfig.sources.volleyballWomen
};

export async function readLocalCsv(key: CsvKey) {
  return readFile(path.join(ROOT, localFiles[key]), "utf8");
}

export async function readCsvWithFallback(key: CsvKey) {
  const url = sourceUrls[key];

  if (!url || !csvConfig.useRemoteSources) {
    return {
      source: localFiles[key],
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
    console.warn(`[csv] Impossible de charger ${url}. Fallback local ${localFiles[key]}.`, error);
    return {
      source: localFiles[key],
      text: await readLocalCsv(key),
      remote: false
    };
  }
}
