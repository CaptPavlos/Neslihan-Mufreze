export function formatCompactNumber(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    return `${trim(n / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${trim(n / 1_000)}K`;
  }
  return String(Math.round(n));
}

function trim(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1);
}
