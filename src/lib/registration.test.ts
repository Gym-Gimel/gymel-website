import { describe, expect, it } from "vitest";
import {
  getRegistrationCourseLabels,
  registrationSchema,
} from "@/lib/registration";

const validRegistration = {
  gender: "Féminin",
  lastName: "Dupont",
  firstName: "Louise",
  birthDate: "2015-04-12",
  avsNumber: "756.1234.5678.97",
  parentName: "Marie Dupont",
  existingMember: "Non",
  acvgNumber: "",
  siblingNames: "",
  address: "Rue du Village 10",
  postalCode: "1188",
  city: "Gimel",
  phone: "079 000 00 00",
  email: "parent@example.ch",
  courses: ["enfantines-lundi"],
  signerName: "Marie Dupont",
  statutesAccepted: "on",
  privacyAccepted: "on",
  website: "",
};

describe("registration validation", () => {
  it("accepts a complete registration and normalizes optional empty fields", () => {
    const result = registrationSchema.parse(validRegistration);

    expect(result.acvgNumber).toBeUndefined();
    expect(result.siblingNames).toBeUndefined();
  });

  it("rejects a registration without a course or required engagement", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      courses: [],
      statutesAccepted: undefined,
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid AVS number format", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      avsNumber: "123.4567.8901.23",
    });

    expect(result.success).toBe(false);
  });

  it("requires a parent for a member under 15 at the season cutoff", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      parentName: "",
    });

    expect(result.success).toBe(false);
  });

  it("resolves only official course labels and prices", () => {
    expect(getRegistrationCourseLabels(["pilates", "volleyball-femmes"])).toEqual([
      "Pilates (CHF 320.-)",
      "Volleyball femmes (CHF 150.-)",
    ]);
  });
});
