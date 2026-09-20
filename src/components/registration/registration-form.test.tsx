// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RegistrationForm } from "@/components/registration/registration-form";

afterEach(cleanup);

describe("RegistrationForm", () => {
  it("requires a parent when the member is under 15 at the season cutoff", () => {
    render(<RegistrationForm />);
    const birthDate = screen.getByLabelText("Date de naissance *");
    const parentName = screen.getByLabelText(/Nom et prénom d'un parent/);

    expect(parentName).not.toBeRequired();

    fireEvent.change(birthDate, { target: { value: "2015-04-12" } });

    expect(parentName).toBeRequired();
  });

  it("shows an error and focuses the course list when no course is selected", () => {
    render(<RegistrationForm />);

    fireEvent.submit(screen.getByRole("form", { name: "Formulaire d'inscription en ligne" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Merci de sélectionner au moins un cours.",
    );
    expect(screen.getByText("Parents-enfants").closest("div")).toHaveFocus();
  });
});
