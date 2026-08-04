import { parse } from "csv-parse/sync";
import { z } from "zod";
import type { CsvValidationError } from "@/types/data";

type ParseResult<T> = {
  data: T[];
  errors: CsvValidationError[];
};

function issueToError(file: string, line: number, issue: z.ZodIssue): CsvValidationError {
  return {
    file,
    line,
    column: issue.path.join(".") || undefined,
    value: "received" in issue ? issue.received : undefined,
    expected: issue.message,
    message: `${file}:${line} ${issue.path.join(".") || "ligne"} - ${issue.message}`
  };
}

export function parseCsvRows<T>(
  file: string,
  csv: string,
  schema: z.ZodType<T, z.ZodTypeDef, unknown>,
  uniqueFields: string[] = ["id"]
): ParseResult<T> {
  const errors: CsvValidationError[] = [];
  let records: Record<string, string>[];

  try {
    records = parse(csv, {
      bom: true,
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as Record<string, string>[];
  } catch (error) {
    return {
      data: [],
      errors: [
        {
          file,
          line: 1,
          expected: "CSV valide avec en-têtes",
          message: error instanceof Error ? error.message : "CSV invalide"
        }
      ]
    };
  }

  const data: T[] = [];
  const seen = new Map<string, Map<string, number>>();

  records.forEach((record, index) => {
    const line = index + 2;
    const parsed = schema.safeParse(record);

    if (!parsed.success) {
      errors.push(...parsed.error.issues.map((issue) => issueToError(file, line, issue)));
      return;
    }

    const typedRecord = parsed.data as Record<string, unknown>;
    for (const field of uniqueFields) {
      const value = String(typedRecord[field] ?? "");
      if (!seen.has(field)) seen.set(field, new Map());
      const values = seen.get(field);
      if (values?.has(value)) {
        errors.push({
          file,
          line,
          column: field,
          value,
          expected: "Valeur unique",
          message: `${file}:${line} ${field} - valeur dupliquée avec la ligne ${values.get(value)}`
        });
        return;
      }
      values?.set(value, line);
    }

    data.push(parsed.data);
  });

  return { data, errors };
}
