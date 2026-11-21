import { cubicBezier, transform } from "motion";
export const Easing = { bezier: cubicBezier };
export function interpolate<T>(
  frame: number,
  input: number[],
  output: T[],
  options: {
    easing: (value: number) => number;
    extrapolateLeft: string;
    extrapolateRight: string;
  },
): T {
  return transform(frame, input, output, { clamp: true, ease: options.easing });
}
