// === Paste this into a .ts file or <script type="module"> === (Mostly written by Grok)

// Function from previous answer
function grayscaleToOrangePalette(gray: number): string {
  const value = Math.max(0, Math.min(255, gray));
  const ORANGE = { r: 255, g: 165, b: 0 };
  const orangeLuminance =
    0.299 * ORANGE.r + 0.587 * ORANGE.g + 0.114 * ORANGE.b; // ~182.35

  //const BLACK = { r: 0, g: 0, b: 0 };
  const WHITE = { r: 255, g: 255, b: 255 };

  let r: number, g: number, b: number;

  if (Math.abs(value - orangeLuminance) < 0.01) {
    r = ORANGE.r;
    g = ORANGE.g;
    b = ORANGE.b;
  } else if (value > orangeLuminance) {
    const t = (value - orangeLuminance) / (255 - orangeLuminance);
    r = ORANGE.r + t * (WHITE.r - ORANGE.r);
    g = ORANGE.g + t * (WHITE.g - ORANGE.g);
    b = ORANGE.b + t * (WHITE.b - ORANGE.b);
  } else {
    const t = value / orangeLuminance;
    r = t * ORANGE.r;
    g = t * ORANGE.g;
    b = t * ORANGE.b;
  }

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

// === Test UI: 10 steps from black to white ===
function createPaletteTest() {
  const container = document.createElement("div");
  container.style.fontFamily = "Arial, sans-serif";
  container.style.padding = "20px";
  container.style.background = "#f0f0f0";
  container.style.borderRadius = "8px";
  container.style.maxWidth = "600px";
  container.style.margin = "20px auto";
  container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

  function showHeading(text:string){
  const title = document.createElement("h3");
  title.textContent = text;
  title.style.margin = "0 0 16px 0";
  title.style.textAlign = "center";
  container.appendChild(title);
  }

  function showColor(grayValue: number) {
    const orangeColor = grayscaleToOrangePalette(grayValue);
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
    grayDiv.textContent = `${grayValue}`;
    row.appendChild(grayDiv);

    // Right: Orange palette
    const orangeDiv = document.createElement("div");
    orangeDiv.style.backgroundColor = orangeColor;
    orangeDiv.style.width = "50%";
    orangeDiv.style.height = "40px";
    orangeDiv.style.display = "flex";
    orangeDiv.style.alignItems = "center";
    orangeDiv.style.justifyContent = "center";
    orangeDiv.style.color = grayValue > 140 ? "black" : "white";
    orangeDiv.style.fontSize = "12px";
    orangeDiv.style.fontWeight = "bold";
    orangeDiv.textContent = orangeColor;
    row.appendChild(orangeDiv);

    container.appendChild(row);
  }
  showHeading("Colors Used")
  const shortN = 5;
  for (let i = 0; i < shortN; i++) {
    const grayValue = Math.round(((i + 0.5) / shortN) * 255);
    showColor(grayValue);
  }
  showHeading("Initial Pallette")
  const longN = 10;
  for (let i = 0; i < longN; i++) {
    const grayValue = Math.round(((i) / (longN - 1)) * 255);
    showColor(grayValue);
  }

  // Footer note
  const note = document.createElement("p");
  note.style.fontSize = "12px";
  note.style.color = "#555";
  note.style.textAlign = "center";
  note.style.margin = "16px 0 0 0";
  note.innerHTML = `Orange (#FFA500) appears at luminance ≈182<br>Linear RGB interpolation used`;
  container.appendChild(note);

  document.body.appendChild(container);
}

// Run it
createPaletteTest();

/**
 * These are the colors that I chose.
 * 26
#261900
77
#714900
128
#BD7A00
179
#FFAB12
230
#FFE4B1
 */

// This is why it's easiest to partition the values into 5 **equal** pieces.
// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComponentTransfer
