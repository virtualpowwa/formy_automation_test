/**
 * Generates a random date within +/- `rangeMonths` of today.
 * Pure native Date + Math.random — no package install needed.
 */
export function randomDateWithinMonths(rangeMonths: number) {
  const today = new Date();
  // random integer in [-rangeMonths, +rangeMonths]
  const offsetMonths = Math.floor(Math.random() * (rangeMonths * 2 + 1)) - rangeMonths;

  const target = new Date(today.getFullYear(), today.getMonth() + offsetMonths, 1);
  const daysInTargetMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.floor(Math.random() * daysInTargetMonth) + 1);

  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const yyyy = target.getFullYear();

  return {
    day: target.getDate(),
    monthDiff: offsetMonths,
    formatted: `${mm}/${dd}/${yyyy}`,
  };
}
