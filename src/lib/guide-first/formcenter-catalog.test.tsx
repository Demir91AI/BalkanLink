import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import FormCatalogVault from "@/components/formCenter/FormCatalogVault";
import { formCatalog, getAllFormEntries } from "@/lib/form-catalog";

// Owner rule (2026-10-27): the "Vize i boravak" category duplicates the dedicated
// Viza Navigator entry, so it must not be listed in the Formulari catalog — while the
// visa guide data (routes, search, legacy mappings) stays in place.
const VISA_SLUGS = [
  "nationalvisum",
  "aufenthaltstitel",
  "niederlassungserlaubnis",
  "verpflichtungserklaerung",
];

function renderVault() {
  return render(<FormCatalogVault onSelect={() => {}} />);
}

describe("Formulari catalog: duplicate visa category removed", () => {
  afterEach(cleanup);

  it("does not list the 'Vize i boravak' category", () => {
    renderVault();
    expect(screen.queryByText("Vize i boravak")).toBeNull();
  });

  it("still lists the seven remaining categories", () => {
    renderVault();
    const visible = formCatalog.filter((g) => g.id !== "vize");
    expect(visible).toHaveLength(7);
    for (const group of visible) {
      expect(screen.queryByText(group.title), group.title).not.toBeNull();
    }
  });

  it("keeps the visa guide entries in the catalog data", () => {
    const slugs = getAllFormEntries().map((e) => e.slug);
    for (const slug of VISA_SLUGS) expect(slugs, slug).toContain(slug);
    expect(getAllFormEntries()).toHaveLength(46);
  });
});
