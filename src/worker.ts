import { FromWorkerData, ToWorkerData } from "./common/types";
import { renderPixel } from "./lib/renderPixel";

self.onmessage = async function (event: MessageEvent<ToWorkerData>) {
  const { row, width, height, aspectRatio } = event.data;

  const data = new Uint8ClampedArray(width * 4);

  for (let x = 0; x < width; x++) {
    const { r, g, b } = renderPixel(
      aspectRatio,
      x / (width - 1),
      row / (height - 1)
    );
    const index = x * 4;
    data[index] = Math.floor(r * 255);
    data[index + 1] = Math.floor(g * 255);
    data[index + 2] = Math.floor(b * 255);
    data[index + 3] = 255;
  }

  const message: FromWorkerData = { row, data };
  self.postMessage(message);
};
