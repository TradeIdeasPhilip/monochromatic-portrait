import "./style.css";
import { getById } from "phil-lib/client-misc";

const image = getById("convert", HTMLImageElement);

image.addEventListener("click", () => {
  if (image.style.transform == "") {
    image.style.transform = "rotateY(180deg)";
  } else {
    image.style.transform = "";
  }
});
