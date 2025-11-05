import { initializedArray } from "phil-lib/misc";
import {
  grayscaleToPalette,
  showPaletteSamples,
  updateDiscreteFilter,
} from "./orange";
import "./style.css";
import { getById, querySelector } from "phil-lib/client-misc";

const image = getById("convert", HTMLImageElement);

image.addEventListener("click", () => {
  if (image.style.transform == "") {
    image.style.transform = "rotateY(180deg)";
  } else {
    image.style.transform = "";
  }
});

const feFuncR = querySelector("feFuncR", SVGFEFuncRElement);
const feFuncG = querySelector("feFuncG", SVGFEFuncGElement);
const feFuncB = querySelector("feFuncB", SVGFEFuncBElement);

function showColor(baseColor: string) {
  showPaletteSamples(baseColor);
  updateDiscreteFilter(
    feFuncR,
    feFuncG,
    feFuncB,
    initializedArray(5, (n) => {
      const value = ((n + 0.5) / 5) * 256;
      return grayscaleToPalette(value, baseColor);
    })
  );
}

const colorPicker = querySelector('input[type="color"]', HTMLInputElement);

function updateFromGUI() {
  showColor(colorPicker.value);
}
updateFromGUI();
colorPicker.addEventListener("input", updateFromGUI);
