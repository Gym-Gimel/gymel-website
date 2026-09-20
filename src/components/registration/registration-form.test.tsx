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

  it("validates a touched field and removes its error once corrected", () => {
    render(<RegistrationForm />);
    const lastName = screen.getByLabelText("Nom *");

    expect(lastName).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByText("Ce champ est trop court.")).not.toBeInTheDocument();

    fireEvent.blur(lastName);

    expect(lastName).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Ce champ est trop court.")).toBeInTheDocument();

    fireEvent.change(lastName, { target: { value: "Dupont" } });

    expect(lastName).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByText("Ce champ est trop court.")).not.toBeInTheDocument();
  });

  it("validates the complete form and focuses the first invalid field on submit", () => {
    render(<RegistrationForm />);

    fireEvent.submit(screen.getByRole("form", { name: "Formulaire d'inscription en ligne" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Merci de corriger les champs indiqués avant l'envoi.",
    );
    expect(screen.getByText("Sélectionnez au moins un cours.")).toBeInTheDocument();
    expect(screen.getByLabelText("Masculin")).toHaveFocus();
  });
});
