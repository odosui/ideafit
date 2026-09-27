// Messages between the board's iframe and embed.js on the host page.
export const READY = 'ideafit:ready'
export const IDENTIFY = 'ideafit:identify'

export interface IdentifyMessage {
  type: typeof IDENTIFY
  token: string | null
}

export const isIdentifyMessage = (data: unknown): data is IdentifyMessage =>
  typeof data === 'object' &&
  data !== null &&
  (data as IdentifyMessage).type === IDENTIFY
