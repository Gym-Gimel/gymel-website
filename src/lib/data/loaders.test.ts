import { describe, expect, it } from "vitest";
import { parseCsvRows } from "@/lib/csv/parse";
import { competitionSchema, courseSchema } from "@/lib/validation/schemas";
import type { Competition, Course } from "@/types/data";

describe("CSV validation", () => {
  it("keeps valid rows and reports invalid rows", () => {
    const csv = [
      "id,slug,name,shortDescription,fullDescription,category,ageRange,days,startTime,endTime,location,monitors,price,status,image,registrationUrl,restartDate,note",
      "ok,bon-cours,Cours test,Intro,Long,Adultes,Adultes,Lundi,18:00,19:00,Salle,Moniteur,CHF 120.-,open,/image.svg,/inscriptions,24.08,",
      "bad,mauvais,Cours test,Intro,Long,Adultes,Adultes,Lundi,18h,19:00,Salle,Moniteur,CHF 120.-,open,/image.svg,/inscriptions,24.08,"
    ].join("\n");

    const result = parseCsvRows<Course>("courses.csv", csv, courseSchema, ["id", "slug"]);

    expect(result.data).toHaveLength(1);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.line).toBe(3);
    expect(result.errors[0]?.column).toBe("startTime");
  });

  it("detects duplicate slugs", () => {
    const csv = [
      "id,slug,title,startDate,endDate,location,category,group,status,description,registrationUrl,programUrl,resultsUrl,featured",
      "a,concours,Concours A,2026-01-01,2026-01-01,Gimel,Concours,Agrès,upcoming,Description,,,,true",
      "b,concours,Concours B,2026-02-01,2026-02-01,Gimel,Concours,Agrès,upcoming,Description,,,,false"
    ].join("\n");

    const result = parseCsvRows<Competition>("competitions.csv", csv, competitionSchema, ["id", "slug"]);

    expect(result.data).toHaveLength(1);
    expect(result.errors[0]?.expected).toBe("Valeur unique");
  });

  it("rejects competition end dates before start dates", () => {
    const csv = [
      "id,slug,title,startDate,endDate,location,category,group,status,description,registrationUrl,programUrl,resultsUrl,featured",
      "a,concours,Concours,2026-02-01,2026-01-01,Gimel,Concours,Agrès,upcoming,Description,,,,true"
    ].join("\n");

    const result = parseCsvRows<Competition>("competitions.csv", csv, competitionSchema, ["id", "slug"]);

    expect(result.data).toHaveLength(0);
    expect(result.errors[0]?.column).toBe("endDate");
  });

  it("accepts event rows with the competition/event schema", () => {
    const csv = [
      "id,slug,title,startDate,endDate,location,category,group,status,description,registrationUrl,programUrl,resultsUrl,featured",
      "a,loto,Loto,2027-01-18,2027-01-18,Gimel,Manifestation,Tous,upcoming,Description,,,,false"
    ].join("\n");

    const result = parseCsvRows<Competition>("events.csv", csv, competitionSchema, ["id", "slug"]);

    expect(result.data).toHaveLength(1);
    expect(result.errors).toHaveLength(0);
  });
});
