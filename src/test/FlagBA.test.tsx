/**
 * FlagBA visual contract tests.
 *
 * These tests lock down the SVG structure so the rendered Bosnian flag stays
 * geometrically correct at every size. Because the SVG uses a fixed viewBox
 * (200x100) and `preserveAspectRatio`, a correct internal geometry guarantees
 * a correct render at any width/height/DPR.
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FlagBA } from "@/components/flags/FlagBA";

const BLUE = "#002F6C";
const YELLOW = "#FECB00";

function getSvg(container: HTMLElement): SVGSVGElement {
  const svg = container.querySelector("svg");
  if (!svg) throw new Error("SVG not found");
  return svg as unknown as SVGSVGElement;
}

describe("FlagBA — official BiH flag SVG contract", () => {
  it("uses a 2:1 viewBox so it scales correctly at any size", () => {
    const { container } = render(<FlagBA width={20} />);
    const svg = getSvg(container);
    expect(svg.getAttribute("viewBox")).toBe("0 0 200 100");
  });

  it.each([16, 20, 32, 48, 96, 200])(
    "preserves 2:1 aspect ratio at width=%i",
    (w) => {
      const { container } = render(<FlagBA width={w} />);
      const svg = getSvg(container);
      const renderedW = Number(svg.getAttribute("width"));
      const renderedH = Number(svg.getAttribute("height"));
      expect(renderedW).toBe(w);
      // Allow ±1px for Math.round
      expect(Math.abs(renderedH * 2 - renderedW)).toBeLessThanOrEqual(1);
    },
  );

  it("renders the blue field as the full background", () => {
    const { container } = render(<FlagBA />);
    const rect = container.querySelector("rect[fill]");
    expect(rect).not.toBeNull();
    expect(rect!.getAttribute("fill")?.toUpperCase()).toBe(BLUE);
    expect(rect!.getAttribute("width")).toBe("200");
    expect(rect!.getAttribute("height")).toBe("100");
  });

  it("renders the yellow triangle with official vertices (100,0)-(200,0)-(200,100)", () => {
    const { container } = render(<FlagBA />);
    const triangle = container.querySelector('polygon[fill="#FECB00"]');
    expect(triangle).not.toBeNull();
    const points = triangle!.getAttribute("points");
    expect(points).toBe("100,0 200,0 200,100");
    expect(triangle!.getAttribute("fill")?.toUpperCase()).toBe(YELLOW);
  });

  it("renders exactly 9 white stars along the hypotenuse", () => {
    const { container } = render(<FlagBA />);
    const stars = container.querySelectorAll('g[fill="#FFFFFF"] polygon');
    expect(stars.length).toBe(9);
  });

  it("places stars on the diagonal from (100,0) to (200,100), evenly spaced", () => {
    const { container } = render(<FlagBA />);
    const stars = Array.from(
      container.querySelectorAll('g[fill="#FFFFFF"] polygon'),
    );

    // For each star compute its centroid from the 10 polygon points and
    // verify it lies on the line y = x - 100, evenly spaced.
    const centroids = stars.map((star) => {
      const pts = (star.getAttribute("points") || "")
        .trim()
        .split(/\s+/)
        .map((p) => p.split(",").map(Number));
      const cx = pts.reduce((s, [x]) => s + x, 0) / pts.length;
      const cy = pts.reduce((s, [, y]) => s + y, 0) / pts.length;
      return { cx, cy };
    });

    centroids.forEach((c, i) => {
      const t = i / (centroids.length - 1);
      const expectedCx = 100 + t * 100;
      const expectedCy = 0 + t * 100;
      expect(Math.abs(c.cx - expectedCx)).toBeLessThan(0.5);
      expect(Math.abs(c.cy - expectedCy)).toBeLessThan(0.5);
    });

    // First star sits on the top edge, last on the right edge — both will be
    // visually halved by the clip-path.
    expect(centroids[0].cy).toBeCloseTo(0, 1);
    expect(centroids[centroids.length - 1].cx).toBeCloseTo(200, 1);
  });

  it("clips stars to the flag rectangle so the end stars appear halved", () => {
    const { container } = render(<FlagBA />);
    const clipRect = container.querySelector("clipPath rect");
    expect(clipRect).not.toBeNull();
    expect(clipRect!.getAttribute("width")).toBe("200");
    expect(clipRect!.getAttribute("height")).toBe("100");

    const starsGroup = container.querySelector('g[fill="#FFFFFF"]');
    expect(starsGroup?.getAttribute("clip-path")).toMatch(/ba-flag-clip/);
  });

  it("exposes accessible labelling for screen readers", () => {
    const { container } = render(<FlagBA />);
    const svg = getSvg(container);
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.getAttribute("aria-label")).toMatch(/Bosne/i);
  });

  it("uses preserveAspectRatio=meet so geometry never distorts", () => {
    const { container } = render(<FlagBA width={500} />);
    const svg = getSvg(container);
    expect(svg.getAttribute("preserveAspectRatio")).toContain("meet");
  });
});
