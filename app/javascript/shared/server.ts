import { CurrentUser } from './currentUser'

function readServerData() {
  const body = document.querySelector('body')
  if (!body) {
    throw new Error('body not found')
  }
  const boardId = body.dataset.pid
  const boardName = body.dataset.boardName ?? ''
  const boardDescription = body.dataset.boardDescription ?? ''

  const userStr = body.dataset.user
  let user: CurrentUser | null = null
  if (userStr) {
    try {
      user = JSON.parse(userStr)
    } catch {
      user = null
    }
  }

  const isOwner = body.dataset.owner === 'true'

  const infoStr = body.dataset.info
  const info = infoStr ? JSON.parse(infoStr) : null
  const env = info.env
  const flash = info.flash

  return {
    boardId,
    boardName,
    boardDescription,
    user,
    isOwner,
    env,
    flash,
  }
}

export default readServerData
