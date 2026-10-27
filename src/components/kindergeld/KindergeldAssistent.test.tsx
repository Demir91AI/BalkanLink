import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "@/i18n/locales/de/forms.json";
import KindergeldAssistent from "./KindergeldAssistent";

vi.mock("@/assets/fonts/liberation-sans/LiberationSans-Regular.ttf?url", () => ({ default: "/font.ttf" }));
i18n.use(initReactI18next).init({ lng: "de", resources: { de: { forms: de } }, ns: ["forms"], interpolation: { escapeValue: false } });

const empty = () => ({ steuerId1: "", familienname: "", vorname: "", geburtsdatum: "", staatsangehoerigkeit: "", strasse: "", plz: "", wohnort: "", staat: "Deutschland", iban: "", kontoinhaber: "self",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", familienkasse: "" })) });
function Host() {
  const [f, setF] = useState(empty());
  return <KindergeldAssistent f={f} set={(k, v) => setF((p) => ({ ...p, [k]: v }))} setKind={(i, k, v) => setF((p) => { const c = [...p.kinder]; c[i] = { ...c[i], [k]: v }; return { ...p, kinder: c }; })} />;
}

describe("KindergeldAssistent UI", () => {
  it("shows official links, blocks next until answered, skips partner when none", () => {
    render(<Host />);
    expect(screen.getByRole("link", { name: /Amtliches KG1/ }).getAttribute("href")).toBe("https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf");
    fireEvent.click(screen.getByRole("button", { name: "Weiter" }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    const [noPartner, noAbroad] = screen.getAllByRole("button", { name: "Nein" });
    fireEvent.click(noPartner); fireEvent.click(noAbroad);
    fireEvent.click(screen.getByRole("button", { name: "Weiter" }));
    expect(screen.getByText("Antragsteller(in)")).toBeTruthy();
    expect(screen.getByText(/Schritt 2 von 5/)).toBeTruthy();
  });
  it("cross-border answer shows the official-check note", () => {
    render(<Host />);
    fireEvent.click(screen.getAllByRole("button", { name: "Ja" })[1]);
    expect(screen.getByRole("note").textContent).toMatch(/Anlage Ausland/);
  });
});
