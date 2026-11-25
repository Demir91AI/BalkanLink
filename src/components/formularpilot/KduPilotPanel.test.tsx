import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import KduPilotPanel from "./KduPilotPanel";

describe("KduPilotPanel", () => {
  it("blocks without a PDF and never offers download before a successful check", async () => {
    render(<I18nextProvider i18n={i18n}><KduPilotPanel /></I18nextProvider>);
    expect(screen.getByRole("button", { name: i18n.t("pages:kduPilot.download") })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: i18n.t("pages:kduPilot.check") }));
    await waitFor(() => expect(screen.getByTestId("kdu-block").textContent).toBe(i18n.t("pages:kduPilot.block.NO_PDF")));
  });
  it("has every UI key in all four locales", async () => {
    const flat = (o: object, p = ""): string[] => Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? flat(v, `${p}${k}.`) : [`${p}${k}`]));
    const sets = await Promise.all(["bs", "hr", "sr", "de"].map(async (l) => flat((await import(`@/i18n/locales/${l}/pages.json`)).default.kduPilot).sort()));
    for (const s of sets) expect(s).toEqual(sets[0]);
    expect(sets[0].length).toBeGreaterThan(100);
  });
});

// Authentic original is never bundled; runs only with a locally obtained copy.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { vi } from "vitest";
import { PDFDocument } from "pdf-lib";
import * as engine from "@/lib/pdf-form-engine";

const original = process.env.KDU_ORIGINAL_PDF;
describe.runIf(!!original && existsSync(original!))("KduPilotPanel with the authentic original", () => {
  it("intake → check → download fills native fields", async () => {
    const font = readFileSync(join(process.cwd(), "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf"));
    vi.stubGlobal("fetch", vi.fn(async () => new Response(font)));
    let saved: Blob | undefined;
    const spy = vi.spyOn(engine, "downloadBlob").mockImplementation((b) => { saved = b; });
    render(<I18nextProvider i18n={i18n}><KduPilotPanel /></I18nextProvider>);
    const raw = new Uint8Array(readFileSync(original!));
    const file = new File([raw], "anlagekdu.pdf", { type: "application/pdf" });
    Object.defineProperty(file, "arrayBuffer", { value: async () => raw.slice().buffer }); // jsdom lacks Blob.arrayBuffer
    fireEvent.change(screen.getByTestId("kdu-file"), { target: { files: [file] } });
    const lbl = (k: string) => screen.getByLabelText(new RegExp(`^${i18n.t(`pages:kduPilot.f.${k}`).replace(/[()]/g, "\\$&")}`));
    const type = (k: string, v: string) => fireEvent.change(lbl(k), { target: { value: v } });
    type("vorname", "Maja"); type("nachname", "Kovač"); type("geburtsdatum", "1991-04-12");
    type("strasse", "Müllerstraße"); type("hausnr", "12a"); type("plz", "80331"); type("ort", "München");
    type("personen", "2"); type("flaecheGesamt", "60");
    fireEvent.click(screen.getByLabelText(i18n.t("pages:kduPilot.o.wohnen.miete")));
    fireEvent.click(screen.getByLabelText(i18n.t("pages:kduPilot.o.bedarf.Pauschalmiete")));
    fireEvent.change(screen.getByLabelText(i18n.t("pages:kduPilot.eurLabel", { item: i18n.t("pages:kduPilot.o.bedarf.Pauschalmiete") })), { target: { value: "900" } });
    fireEvent.click(screen.getByLabelText(i18n.t("pages:kduPilot.o.wasser.zentral")));
    fireEvent.click(screen.getAllByLabelText(i18n.t("pages:kduPilot.o.mieteDirekt.nein")).at(-1)!);
    await new Promise((r) => setTimeout(r, 50));
    fireEvent.click(screen.getByRole("button", { name: i18n.t("pages:kduPilot.check") }));
    await waitFor(() => expect(screen.getByTestId("kdu-review-ok")).toBeTruthy(), { timeout: 8000 });
    fireEvent.click(screen.getByRole("button", { name: i18n.t("pages:kduPilot.download") }));
    await waitFor(() => expect(saved).toBeDefined(), { timeout: 8000 });
    const f = (await PDFDocument.load(await new Promise<Uint8Array>((res) => { const r = new FileReader(); r.onload = () => res(new Uint8Array(r.result as ArrayBuffer)); r.readAsArrayBuffer(saved!); }))).getForm();
    expect(f.getTextField("txtfPersonNachname").getText()).toBe("Kovač");
    expect(f.getTextField("numfBedarfPauschalmiete").getText()).toBe("900");
    expect(f.getRadioGroup("rbtnMieteDirekt").getSelected()).toBe("nein");
    expect(f.getTextField("dateUnterschriftPerson").getText() ?? "").toBe("");
    spy.mockRestore(); vi.unstubAllGlobals();
  }, 20000);
});
