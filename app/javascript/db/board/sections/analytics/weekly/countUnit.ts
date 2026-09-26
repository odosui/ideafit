export const countUnit = (one: string, many: string) => (count: number) =>
  count === 1 ? one : many
