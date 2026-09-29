// Anything that changes what the sidebar counts tells it to fetch again.
const listeners = new Set<() => void>()

export const markBoardCountsStale = () =>
  listeners.forEach((listener) => listener())

export const onBoardCountsStale = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
