import { Pixel } from "../common/types";

export function renderPixel(_aspectRatio: number, x: number, y: number): Pixel {
  const r = x;
  const g = y;
  const b = 1.0;
  return { r, g, b };
}
