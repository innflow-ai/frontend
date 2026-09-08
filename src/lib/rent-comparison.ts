export function summarizeRents(input: string) {
  const values = input
    .trim()
    .split(/[\s,;]+/)
    .map(Number);
  if (
    values.length < 3 ||
    values.length > 100 ||
    values.some((n) => !Number.isFinite(n) || n <= 0 || n > 1000000)
  ) {
    throw new Error(
      "Enter 3–100 positive monthly rents, without currency symbols or thousands separators.",
    );
  }
  values.sort((a, b) => a - b);
  function percentile(p: number) {
    const position = (values.length - 1) * p;
    const lower = Math.floor(position);
    return (
      values[lower] +
      (values[Math.ceil(position)] - values[lower]) * (position - lower)
    );
  }
  return {
    count: values.length,
    median: percentile(0.5),
    average: values.reduce((sum, n) => sum + n, 0) / values.length,
    lower: percentile(0.25),
    upper: percentile(0.75),
    min: values[0],
    max: values[values.length - 1],
  };
}
