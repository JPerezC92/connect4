// export function forInRange<T = number>(n = 0 as T): T[] {
//   return Array(n)
//     .fill(0)
//     .map((_, i) => ++i);
// }

export const forInRange = (n: number): number[] => {
  return Array(n)
    .fill(0)
    .map((_, i) => ++i);
};
