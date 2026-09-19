const currentLocation = () =>
  window.location.pathname + window.location.search + window.location.hash

const withReturnTo = (path: string) =>
  `${path}?return_to=${encodeURIComponent(currentLocation())}`

export const signInPath = () => withReturnTo('/sign_in')
export const signOutPath = () => withReturnTo('/sign_out')
export const returnToHere = currentLocation
