import { parseCsvRows } from "@/lib/csv/parse";
import { readLocalCsv } from "@/lib/data/files";
import { competitionSchema, courseSchema, volleyballSchema } from "@/lib/validation/schemas";
import type { ZodType, ZodTypeDef } from "zod";

const targets = [
  { key: "courses" as const, file: "data/courses.csv", schema: courseSchema, uniqueFields: ["id", "slug"] },
  { key: "competitions" as const, file: "data/competitions.csv", schema: competitionSchema, uniqueFields: ["id", "slug"] },
  { key: "volleyballMen" as const, file: "data/volleyball-men.csv", schema: volleyballSchema, uniqueFields: ["id"] },
  { key: "volleyballWomen" as const, file: "data/volleyball-women.csv", schema: volleyballSchema, uniqueFields: ["id"] }
] satisfies {
  key: "courses" | "competitions" | "volleyballMen" | "volleyballWomen";
  file: string;
  schema: ZodType<unknown, ZodTypeDef, unknown>;
  uniqueFields: string[];
}[];

let hasErrors = false;

for (const target of targets) {
  const csv = await readLocalCsv(target.key);
  const result = parseCsvRows<unknown>(target.file, csv, target.schema, target.uniqueFields);

  if (result.errors.length > 0) {
    hasErrors = true;
    result.errors.forEach((error) => {
      console.error(`${error.file}:${error.line}${error.column ? `:${error.column}` : ""}`);
      console.error(`  Reçu: ${String(error.value ?? "n/a")}`);
      console.error(`  Attendu: ${error.expected}`);
    });
  } else {
    console.log(`${target.file}: ${result.data.length} lignes valides`);
  }
}

if (hasErrors) process.exit(1);
