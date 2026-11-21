// Two independent proportions, two-sided alpha .05, power .80, 20% relative MDE.
const baseline = Number(process.argv[2]);
const visitorsPerDay = Number(process.argv[3]);
const treatment = baseline * 1.2;
if (!(baseline > 0 && treatment < 1 && visitorsPerDay > 0)) {
  console.error("Usage: node scripts/marketing-experience-sample-size.mjs <baseline-rate 0..0.833> <consenting-visitors/day>");
  process.exit(1);
}
const pooled = (baseline + treatment) / 2;
const perVariant = Math.ceil((1.959964 * Math.sqrt(2 * pooled * (1 - pooled)) + 0.841621 * Math.sqrt(baseline * (1 - baseline) + treatment * (1 - treatment))) ** 2 / (treatment - baseline) ** 2);
const estimatedEnrollmentDays = Math.max(14, Math.ceil(2 * perVariant / visitorsPerDay));
console.log(JSON.stringify({ baseline, targetRate: treatment, relativeMDE: 0.2, alpha: 0.05, power: 0.8, perVariant, totalVisitors: 2 * perVariant, estimatedEnrollmentDays, maturationDays: 7, feasibleWithin42Days: estimatedEnrollmentDays <= 42 }, null, 2));
