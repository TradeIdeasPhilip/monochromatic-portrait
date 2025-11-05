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

function setColors(baseColor: string, count: number) {
  showPaletteSamples(baseColor);
  updateDiscreteFilter(
    feFuncR,
    feFuncG,
    feFuncB,
    initializedArray(count, (n) => {
      const value = Math.floor(((n + 0.5) / count) * 256);
      return grayscaleToPalette(value, baseColor);
    })
  );
}

const colorPicker = querySelector('input[type="color"]', HTMLInputElement);
const countInput = querySelector('input[type="number"]', HTMLInputElement);

function updateFromGUI() {
  const countValid = countInput.validity.valid && countInput.value != "";
  const count = countValid ? countInput.valueAsNumber : 5;
  setColors(colorPicker.value, count);
}
updateFromGUI();
colorPicker.addEventListener("input", updateFromGUI);
countInput.addEventListener("input", updateFromGUI);
