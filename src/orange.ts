// === Paste this into a .ts file or <script type="module"> === (Mostly written by Grok)

import { querySelectorAll } from "phil-lib/client-misc";
import { FIGURE_SPACE } from "phil-lib/misc";

export function showPaletteSamples(baseColor: string) {
  querySelectorAll(".delete-me", HTMLDivElement, 0).forEach((oldContainer) => {
    oldContainer.remove();
  });
  const container = document.createElement("div");
  container.classList.add("delete-me");
  // Make sure the numbers line up.
  // Surprisingly few fonts have fixed with digits.
  container.style.fontFamily = "Roboto, monospace";
  container.style.padding = "20px";
  container.style.background = "#f0f0f0";
  container.style.borderRadius = "8px";
  container.style.maxWidth = "600px";
  container.style.margin = "20px auto";
  container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

  function showHeading(text: string) {
    const title = document.createElement("h3");
    title.textContent = text;
    title.style.margin = "0 0 16px 0";
    title.style.textAlign = "center";
    container.appendChild(title);
  }

  function showColor(grayValue: number) {
    const finalColor = grayscaleToPalette(grayValue, baseColor);
    const grayColor = `#${grayValue.toString(16).padStart(2, "0").repeat(3)}`;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.marginBottom = "8px";
    row.style.borderRadius = "6px";
    row.style.overflow = "hidden";
    row.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";

    // Left: Original grayscale
    const grayDiv = document.createElement("div");
    grayDiv.style.backgroundColor = grayColor;
    grayDiv.style.width = "50%";
    grayDiv.style.height = "40px";
    grayDiv.style.display = "flex";
    grayDiv.style.alignItems = "center";
    grayDiv.style.justifyContent = "center";
    grayDiv.style.color = grayValue > 128 ? "black" : "white";
    grayDiv.style.fontSize = "12px";
    grayDiv.style.fontWeight = "bold";
    grayDiv.textContent = `${Math.round((grayValue / 255) * 100)}%`;
    row.appendChild(grayDiv);

    // Right: Monochromatic palette
    const monochromaticDiv = document.createElement("div");
    monochromaticDiv.style.backgroundColor = finalColor;
    monochromaticDiv.style.width = "50%";
    monochromaticDiv.style.height = "40px";
    monochromaticDiv.style.display = "flex";
    monochromaticDiv.style.alignItems = "center";
    monochromaticDiv.style.justifyContent = "center";
    monochromaticDiv.style.color = grayValue > 140 ? "black" : "white";
    monochromaticDiv.style.fontSize = "12px";
    monochromaticDiv.style.fontWeight = "bold";
    const r = parseInt(finalColor.slice(1, 3), 16);
    const g = parseInt(finalColor.slice(3, 5), 16);
    const b = parseInt(finalColor.slice(5, 7), 16);
    function format(name: string, value: number) {
      const number = Math.round((value / 255) * 100).toString();
      const prefix = FIGURE_SPACE.repeat(3 - number.length);
      const result = `${prefix}${name} = ${number}%`;
      return result;
    }
    monochromaticDiv.textContent = `${format("r", r)}, ${format(
      "g",
      g
    )}, ${format("b", b)}`;
    row.appendChild(monochromaticDiv);

    container.appendChild(row);
  }
  showHeading("Smaller Palette");
  const shortN = 5;
  for (let i = 0; i < shortN; i++) {
    const grayValue = Math.round(((i + 0.5) / shortN) * 255);
    showColor(grayValue);
  }
  showHeading("Larger Palette");
  const longN = 10;
  for (let i = 0; i < longN; i++) {
    const grayValue = Math.round((i / (longN - 1)) * 255);
    showColor(grayValue);
  }

  // TODO make this work!
  /*
  // Footer note
  const note = document.createElement("p");
  note.style.fontSize = "12px";
  note.style.color = "#555";
  note.style.textAlign = "center";
  note.style.margin = "16px 0 0 0";
  note.innerHTML = `Orange (#FFA500) appears at luminance ≈182<br>Linear RGB interpolation used`;
  container.appendChild(note);
  */

  document.body.appendChild(container);
}

/**
 * Maps a grayscale value (0-255) to a monochromatic palette defined by a base color.
 * - 0 → black
 * - luminance(base) → base color
 * - 255 → white
 * @param value Grayscale input (0-255)
 * @param baseColorHex Base color in #RRGGBB format (e.g. "#FFA500")
 * @returns Hex color string (e.g. "#FFAB12")
 */
export function grayscaleToPalette(
  value: number,
  baseColorHex: string
): string {
  // Clamp
  const v = Math.max(0, Math.min(255, value));

  // Parse base color
  const rHex = baseColorHex.slice(1, 3);
  const gHex = baseColorHex.slice(3, 5);
  const bHex = baseColorHex.slice(5, 7);
  const BASE = {
    r: parseInt(rHex, 16),
    g: parseInt(gHex, 16),
    b: parseInt(bHex, 16),
  };

  // Compute luminance of base color
  const baseLuminance = 0.299 * BASE.r + 0.587 * BASE.g + 0.114 * BASE.b;

  const BLACK = { r: 0, g: 0, b: 0 };
  const WHITE = { r: 255, g: 255, b: 255 };

  let r: number, g: number, b: number;

  if (Math.abs(v - baseLuminance) < 0.01) {
    // Exact match
    r = BASE.r;
    g = BASE.g;
    b = BASE.b;
  } else if (v > baseLuminance) {
    // Brighter: interpolate to white
    const t = (v - baseLuminance) / (255 - baseLuminance);
    r = BASE.r + t * (WHITE.r - BASE.r);
    g = BASE.g + t * (WHITE.g - BASE.g);
    b = BASE.b + t * (WHITE.b - BASE.b);
  } else {
    // Darker: interpolate to black
    const t = v / baseLuminance;
    r = t * BASE.r;
    g = t * BASE.g;
    b = t * BASE.b;
  }

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

/**
 * Updates SVG <feFuncR/G/B> discrete tables with 5 colors.
 * @param feFuncR SVG <feFuncR> element
 * @param feFuncG SVG <feFuncG> element
 * @param feFuncB SVG <feFuncB> element
 * @param colors Array of 5 hex colors (from grayscaleToPalette)
 */
export function updateDiscreteFilter(
  feFuncR: SVGFEFuncRElement,
  feFuncG: SVGFEFuncGElement,
  feFuncB: SVGFEFuncBElement,
  colors: string[]
): void {
  if (
    !(
      feFuncR instanceof SVGFEFuncRElement &&
      feFuncG instanceof SVGFEFuncGElement &&
      feFuncB instanceof SVGFEFuncBElement
    )
  ) {
    // TypeScript sees these three types as equivalent.
    // It will allow you to use them interchangeably at compile time.
    // So I added this run time check.
    console.error({ feFuncR, feFuncG, feFuncB });
    throw new Error("wtf");
  }

  // Extract R, G, B from each color
  const rValues: number[] = [];
  const gValues: number[] = [];
  const bValues: number[] = [];

  for (const hex of colors) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    rValues.push(r);
    gValues.push(g);
    bValues.push(b);
  }

  // Update SVG attributes
  feFuncR.setAttribute("type", "discrete");
  feFuncR.setAttribute("tableValues", rValues.join(" "));

  feFuncG.setAttribute("type", "discrete");
  feFuncG.setAttribute("tableValues", gValues.join(" "));

  feFuncB.setAttribute("type", "discrete");
  feFuncB.setAttribute("tableValues", bValues.join(" "));
}
