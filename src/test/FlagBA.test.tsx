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

  it("renders the yellow triangle with vertices on top edge, top-right and bottom-right", () => {
    const { container } = render(<FlagBA />);
    const triangle = container.querySelector('polygon[fill="#FECB00"]');
    expect(triangle).not.toBeNull();
    const points = triangle!.getAttribute("points");
    expect(points).toMatch(/^70,0 200,0 200,100$/);
    expect(triangle!.getAttribute("fill")?.toUpperCase()).toBe(YELLOW);
  });

  it("renders exactly 9 white stars along the hypotenuse", () => {
    const { container } = render(<FlagBA />);
    const stars = container.querySelectorAll('g[fill="#FFFFFF"] polygon');
    expect(stars.length).toBe(9);
  });

  it("places stars on the blue side, parallel to the hypotenuse", () => {
    const { container } = render(<FlagBA />);
    const stars = Array.from(
      container.querySelectorAll('g[fill="#FFFFFF"] polygon'),
    );

    const centroids = stars.map((star) => {
      const pts = (star.getAttribute("points") || "")
        .trim()
        .split(/\s+/)
        .map((p) => p.split(",").map(Number));
      const cx = pts.reduce((s, [x]) => s + x, 0) / pts.length;
      const cy = pts.reduce((s, [, y]) => s + y, 0) / pts.length;
      return { cx, cy };
    });

    // For each star, the line from hypotenuse (y = (100/130)*(x-70)) must
    // place it on the BLUE side: y > (100/130)*(x-70) means below the line,
    // which here is the YELLOW side. Blue side: y < (100/130)*(x-70) is FALSE
    // — actually blue is to the LEFT (smaller x for given y). We verify each
    // centroid is strictly outside the yellow triangle.
    centroids.forEach((c) => {
      // Line through (70,0)-(200,100): 100x - 130y - 7000 = 0.
      // Yellow side is where 100x - 130y - 7000 > 0. Blue side: < 0.
      const side = 100 * c.cx - 130 * c.cy - 7000;
      expect(side).toBeLessThan(0);
    });
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
