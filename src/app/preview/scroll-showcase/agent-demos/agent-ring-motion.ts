/** Draft timing from STORYBOARD_1. Seconds; all artwork stays mounted. */
export const ringTiming = {
  entrance: 0.45,
  rotation: 0.7,
  expansion: 0.3,
  hold: 1.2,
  exit: 0.45,
} as const;
export const ringNames = [
  "Codex",
  "VS Code",
  "Claude",
  "Cursor",
  "Muse",
  "Devin",
  "Grokbot",
  "Quinn AI",
] as const;
export const ringAssets = [
  "codex.svg",
  "vscode.svg",
  "claude.svg",
  "cursor.svg",
  "muse.svg",
  "devin.svg",
  "grokbot.png",
  "quinn.svg",
] as const;
export const ringGeometry = {
  width: 1085,
  height: 893,
  centerX: 542.5,
  centerY: 1224.41681,
  radius: 880,
  tile: 112,
  selected: 189.8923,
  step: 11.25,
  count: 32,
} as const;
const firstHoldEnd =
  ringTiming.entrance + ringTiming.expansion + ringTiming.hold;
const stepDuration =
  ringTiming.rotation + ringTiming.expansion + ringTiming.hold;
export const ringExitStart = firstHoldEnd + 8 * stepDuration;
export const ringDuration = ringExitStart + ringTiming.exit;
export const ringArrival = (step: number) =>
  step === 0
    ? ringTiming.entrance
    : firstHoldEnd + (step - 1) * stepDuration + ringTiming.rotation;
export const rotationTrack = { times: [0, firstHoldEnd], values: [0, 0] };
for (let step = 1; step <= 8; step++) {
  rotationTrack.times.push(
    ringArrival(step),
    ringArrival(step) + ringTiming.expansion + ringTiming.hold,
  );
  rotationTrack.values.push(
    -step * ringGeometry.step,
    -step * ringGeometry.step,
  );
}
rotationTrack.times.push(ringDuration);
rotationTrack.values.push(-90);
rotationTrack.times = rotationTrack.times.map((time) => time / ringDuration);
export function selectionTrack(slot: number) {
  if (slot > 8) return { times: [0, 1], values: [0, 0] };
  const arrival = ringArrival(slot);
  const end = arrival + ringTiming.expansion + ringTiming.hold;
  return {
    times: [
      0,
      arrival,
      arrival + ringTiming.expansion,
      end,
      ...(slot < 8 ? [end + ringTiming.expansion] : []),
      ringDuration,
    ].map((time) => time / ringDuration),
    values: [0, 0, 1, 1, ...(slot < 8 ? [0] : []), slot < 8 ? 0 : 1],
  };
}
